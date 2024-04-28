import React, { useEffect, useState } from "react";
import { Button, Spin, Table, Tag } from "antd";


const CustomersPage: React.FC = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Users");
        }
        const res = await response.json();
        console.log(res)

        const formattedData = res.data.map((user: any) => ({
          key: user._id,
          userName: user.userName,
          email:user.email,
          contact:user.phoneNumber,
          shippingAddress: user.shippingAddress?.city,
          orders:user.orders
        }));
        setUserData(formattedData);
      } catch (error) {
        console.log("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, []);


  const columns = [

    {
      title:'Username',
      dataIndex: "userName",
      key: "userName",
    },
    {
      title:'contact',
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    }
    
  ];

  return (
    <>
      <Table columns={columns} dataSource={userData} />
    </>
  );
};

export default CustomersPage;
