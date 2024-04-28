import React, {  useState } from "react";
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Image, Button } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "",
    label: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    key: "Orders",
    label: "Orders",
    icon: <ProductOutlined />,
  },

  {
    key: "Customers",
    label: "Customers",
    icon: <UserOutlined />,
  },

  {
    key: "Feedbacks",
    label: "Feedbacks",
    icon: <BookOutlined />,
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedkey = location.pathname.slice(1)
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:'space-between',
          backgroundColor: "white",
        }}
      >
        <div>
          <Image preview={false} src={logo} height={45} />
        </div>
        <Button icon={<LogoutOutlined/>} size="large" type="text" style={{float:'right'}}>Logout</Button>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer, paddingTop:20 }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[""]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            selectedKeys={[selectedkey]}
            onSelect={(key) => {
              const path = key.key;
              navigate(path);
            }}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px", marginTop: 30 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: '71.2vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Rasi Traders ©{new Date().getFullYear()} Created by Pradeep
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
