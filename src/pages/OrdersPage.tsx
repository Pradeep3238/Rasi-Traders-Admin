import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface Order {
  key: string;
  transactionId: string;
  product: JSX.Element[];
  billAmount: number;
  status: string;
  quantity: number;
}
const OrdersPage: React.FC = () => {
  const [orderData, setOrderData] = useState<Order[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order/all`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const res = await response.json();
        console.log(res.data);

        const formattedData = res.data.map((order: any) => ({
          key: order._id,
          user: order.user.email,
          contact: order.user.phoneNumber,
          transactionId: order.razorpay_payment_id,
          product: order.products.map((prod: any) => (
            <div key={prod.product._id}>
              • {prod.product.name} -{" "}
              <span style={{ fontWeight: "bold" }}>{prod.quantity}</span>
            </div>
          )),
          billAmount: order.billAmount,
          status: order.status,
          quantity: order.totalQuantity,
        }));
        setOrderData(formattedData);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrders =
        orderData &&
        orderData.map((order) => {
          if (order.key === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
      setOrderData(updatedOrders);
      message.success(`Order status updated successfully to ${newStatus}`);
    } catch (error) {
      console.log("Error updating order status:", error);
      message.error("Failed to update order status");
    }
  };

  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "user",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Products & Quantity",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "No.Of Items",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Bill Amount",
      dataIndex: "billAmount",
      key: "billAmount",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: string) => {
        let color: string;
        switch (status) {
          case "pending":
            color = "grey";
            break;
          case "confirmed":
            color = "yellow";
            break;
          case "shipped":
            color = "orange";
            break;
          case "delivered":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          default:
            color = "blue";
            break;
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: Order) => {
        if (record.status === "cancelled") {
          return <Tag icon={<CloseCircleOutlined/>}>{record.status.toUpperCase()}</Tag>;
        } else if(record.status === "delivered" ){
          return <Tag icon={<CheckCircleOutlined />}>{record.status.toUpperCase()}</Tag>;

        } else {
          return (
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                if (record.status === "pending") {
                  updateOrderStatus(record.key, "confirmed");
                } else if (record.status === "confirmed") {
                  updateOrderStatus(record.key, "shipped");
                } else if (record.status === "shipped") {
                  updateOrderStatus(record.key, "delivered");
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="default">
                {record.status === "pending" && "Confirm"}
                {record.status === "confirmed" && "Ship"}
                {record.status === "shipped" && "Deliver"}
              </Button>
            </Popconfirm>
          );
        }
      }
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={orderData} />
    </>
  );
};

export default OrdersPage;
