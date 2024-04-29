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
          address: `${user.shippingAddress?.street}, ${user.shippingAddress?.city}, ${user.shippingAddress?.zip}`,
          orders:user.orders.map((order:any)=>(
            <div>
              • {order}
            </div>
          ))
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
