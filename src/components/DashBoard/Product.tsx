// Product component file

import { useState } from "react";
import { Card, Typography, Carousel, message, Button, Popconfirm, Flex,Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./product.module.scss";
import EditProductModal from "./EditProductModal ";
const { Title, Paragraph } = Typography;

const handleDelete = async (productId: any) => {
  try {
    console.log(productId);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      message.success("Successfully Deleted Item");
    }
  } catch (err) {
    message.error("Error Deleting item");
  }
};

const Product: React.FC<{ data: any }> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Card
      type="inner"
      bordered
      hoverable
      className={styles.cardContainer}
      cover={
        <div className={styles.imageContainer}>
          <Carousel effect="fade" dots>
            {data.images.map((image: string, index: number) => (
              <img className={styles.image} src={image} key={index} />
            ))}
          </Carousel>
        </div>
      }
      actions={[
        <Button
          type="text"
          onClick={showModal}
          icon={<EditOutlined />}
        ></Button>,

        <Popconfirm
          title="Are you sure you want to delete this product ?"
          onConfirm={() => handleDelete(data._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="text" icon={<DeleteOutlined />} key="Delete">
          </Button>
        </Popconfirm>,
      ]}
    >
      {data.quantity > 0 ? (
        <Tag
          color={data.quantity < 20 ? "orange" : "green"}
          style={{
            fontSize: 14,
            position: "absolute",
            right: 10,
            top: 10,
            padding: 3,
          }}
        >
          {data.quantity < 20 ? "Only few left" : "In Stock"}
        </Tag>
      ) : (
        <Tag
          color="red"
          style={{
            fontSize: 14,
            position: "absolute",
            right: 10,
            top: 10,
            padding: 3,
          }}
        >
          Out of Stock
        </Tag>
      )}

      <Title level={3} style={{ margin: 0 }}>
        {data.name}
      </Title>
      <Paragraph style={{ fontFamily: "monospace", margin: 0 }}>
        ₹<span style={{ fontWeight: "bold" }}>{data.price}</span>/
        <span style={{ fontSize: 12, fontWeight: "0" }}>{data.unit}</span>
      </Paragraph>

      <Flex vertical style={{ padding: 0, margin: 0 }}>
        <Paragraph style={{ margin: "10px 0 0 0" }}>
          <span style={{ fontWeight: "light", fontFamily: "sans-serif" }}>
            Category:{" "}
          </span>
          {data.category}
        </Paragraph>
        <Paragraph style={{ margin: 0 }}>
          <span style={{ fontWeight: 10, fontFamily: "sans-serif" }}>
            Description:{" "}
          </span>
          {data.description}
        </Paragraph>
        <Paragraph style={{ margin: 0 }}>
          <span style={{ fontWeight: "light", fontFamily: "sans-serif" }}>
            Brand:{" "}
          </span>
          {data.brand}
        </Paragraph>
        <Paragraph style={{ margin: "0 0 10px 0" }}>
          <span style={{ fontWeight: "light", fontFamily: "sans-serif" }}>
            Material:{" "}
          </span>
          {data.material}
        </Paragraph>
      </Flex>
      <EditProductModal open={open} onCancel={handleCancel} data={data} />
    </Card>
  );
};

export default Product;
