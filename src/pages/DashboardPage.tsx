import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import { ShoppingCartOutlined, UserOutlined, MessageOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';

interface Counts {
  orders: number;
  users: number;
  feedbacks: number;
  products: number;
}

const DashboardPage: React.FC = () => {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [ordersPerDay, setOrdersPerDay] = useState<any[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [ordersResponse, usersResponse, feedbacksResponse, productsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/analytics/orders`),
          fetch(`${import.meta.env.VITE_API_URL}/analytics/users`),
          fetch(`${import.meta.env.VITE_API_URL}/analytics/feedbacks`),
          fetch(`${import.meta.env.VITE_API_URL}/analytics/products`),
        ]);

        if (!ordersResponse.ok || !usersResponse.ok || !feedbacksResponse.ok || !productsResponse.ok) {
          throw new Error('One or more requests failed');
        }

        const ordersData = await ordersResponse.json();
        const usersData = await usersResponse.json();
        const feedbacksData = await feedbacksResponse.json();
        const productsData = await productsResponse.json();

        setCounts({
          orders: ordersData.count,
          users: usersData.count,
          feedbacks: feedbacksData.count,
          products: productsData.count
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    // const fetchOrdersPerDay = async () => {
    //   try {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/analytics/orders-per-day`);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch orders per day');
    //     }
    //     const { ordersPerDay } = await response.json();
    //     setOrdersPerDay(ordersPerDay);
    //   } catch (error) {
    //     console.error('Error fetching orders per day:', error);
    //   }
    // };

    fetchCounts();
    // fetchOrdersPerDay();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  // const chartConfig = {
  //   data: ordersPerDay,
  //   xField: '_id',
  //   yField: 'count',
  //   point: {
  //     size: 5,
  //     shape: 'diamond'
  //   },
  //   xAxis: {
  //     title: { text: 'Date' }
  //   },
  //   yAxis: {
  //     title: { text: 'Number of Orders' }
  //   },
  //   height: 250,
  //   width: 500
  // };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 50, marginLeft:60}}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{marginBottom:20}}>
          <Card bordered style={{ width: 400, border:'solid 0.5px lightgrey' }} hoverable>
            <div style={{ textAlign: 'center' }}>
              <ShoppingCartOutlined style={{ fontSize: '2rem' }} />
              <div style={{ fontSize: '1.5rem' }}>{counts?.orders}</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' , fontWeight:'bold', fontFamily:'monospace'}}>Total Orders</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{marginBottom:20}}>
          <Card bordered style={{ width: 400, border:'solid 0.5px lightgrey' }}  hoverable>
            <div style={{ textAlign: 'center' }}>
              <UserOutlined style={{ fontSize: '2rem' }} />
              <div style={{ fontSize: '1.5rem' }}>{counts?.users}</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' , fontWeight:'bold', fontFamily:'monospace'}}>Total Users</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card bordered={false} style={{ width: 400, border:'solid 0.5px lightgrey' }}  hoverable>
            <div style={{ textAlign: 'center' }}>
              <MessageOutlined style={{ fontSize: '2rem' }} />
              <div style={{ fontSize: '1.5rem' }}>{counts?.feedbacks}</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' , fontWeight:'bold', fontFamily:'monospace'}}>Total Feedbacks</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card bordered style={{ width: 400, border:'solid 0.5px lightgrey' }}  hoverable>
            <div style={{ textAlign: 'center' }}>
              <AppstoreOutlined style={{ fontSize: '2rem' }} />
              <div style={{ fontSize: '1.5rem' }}>{counts?.products}</div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' , fontWeight:'bold', fontFamily:'monospace'}}>Total Products</div>
          </Card>
        </Col>
      </Row>


      {/* <Row gutter={[16, 16]} justify="center" style={{width:'90%', margin:'auto'}}>
        <Col span={24}>
          <Card title="Orders Placed Per Day" bordered>
            <Line {...chartConfig} />
          </Card>
        </Col>
      </Row> */}
    </>
  );
};

export default DashboardPage;