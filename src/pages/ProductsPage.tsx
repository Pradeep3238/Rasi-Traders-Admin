import React, { useEffect, useState } from "react";
import { Button, Col, Row, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddProductModal from "../components/DashBoard/AddProductModal";
import Product from "../components/DashBoard/Product";

const ProductsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

  return (
    <>
      <div>
        <Button type="primary" style={{ float: "right" }} onClick={showModal}>
          {" "}
          <PlusCircleOutlined /> Add Product{" "}
        </Button>
      </div>
      <Spin spinning={loading} size="large">
        <Row gutter={[32, 32]} style={{ marginTop: 50 }}>
          {products.map((product, index) => (
            <Col key={index} span={8} style={{ marginBottom: 16 }}>
              <Product data={product} />
            </Col>
          ))}
        </Row>
      </Spin>

      <AddProductModal open={open} onCancel={handleCancel} />
    </>
  );
};

export default ProductsPage;
