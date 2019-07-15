import React, { useMemo  } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout, Menu, Breadcrumb, message,
} from 'antd';

const { Header, Content, Footer } = Layout;

export default function MainLayout(props) {
  async function handleLogout(e) {
    try {
      e.preventDefault();
      await props.logout();
      props.history.push("/");
    } catch (error) {
      message.error(error.message);
    }
  }

  let defaultPath = props.path || '/';

  if (defaultPath === '/dashboard') {
    defaultPath = '/';
  }

  if (defaultPath === '/' && props.mainUser.role === 'teacher') {
    defaultPath = '/classes/list';
  }

  const menuItems = useMemo(() => {
    if (props.mainUser.role === 'teacher') {
      return (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultPath]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/classes">
            <Link to="/classes/list">Classes</Link>
          </Menu.Item>

          <Menu.Item key="/students">
            <Link to="/students/list">Students</Link>
          </Menu.Item>

          <Menu.Item key="logout" style={{ float: 'right' }}>
            <a href="logout" onClick={handleLogout}>Logout</a>
          </Menu.Item>
        </Menu>
      )
    }

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[defaultPath]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="/admins">
          <Link to="/admins/list">Admins</Link>
        </Menu.Item>

        <Menu.Item key="/schools">
          <Link to="/schools/list">Schools</Link>
        </Menu.Item>

        <Menu.Item key="/teachers">
          <Link to="/teachers/list">Teachers</Link>
        </Menu.Item>

        <Menu.Item key="/classes">
          <Link to="/classes/list">Classes</Link>
        </Menu.Item>

        <Menu.Item key="/students">
          <Link to="/students/list">Students</Link>
        </Menu.Item>

        <Menu.Item key="logout" style={{ float: 'right' }}>
          <a href="logout" onClick={handleLogout}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }, []);

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        {
          menuItems
        }
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/*
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          */}
        </Breadcrumb>

        <div style={{ minHeight: '80vh' }}>
          {props.children}
        </div>
        {
          /*
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              {props.children}
            </div>
          */
        }
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}
