import React, { useEffect, useState } from "react";
import { Table } from "antd";


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
          address: `${user.shippingAddress?.street}, ${user.shippingAddress?.city}, ${user.shippingAddress?.zip}`,
          noOfOrders:`${user.orders.reduce((acc:any,order:any)=>{
            acc+=order.totalQuantity
            return(acc)
          },0)} items`,
          ordersAmt:`₹ ${user.orders.reduce((acc:any,order:any)=>{
            acc+=order.billAmount
            return(acc)
        },0)}`,
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "No.of Items ordered",
      dataIndex: "noOfOrders",
      key: "noOfOrders",
    },
    {
      title: "Total purchase amount",
      dataIndex: "ordersAmt",
      key: "ordersAmt",
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={userData} />
    </>
  );
};

export default CustomersPage;
