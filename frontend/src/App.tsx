import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";

// icons
import {
  AiOutlineUser,
  AiOutlineLaptop,
  AiOutlineNotification,
} from "react-icons/ai";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import ErrorPage from "./pages/ErrorPage";

// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Layout>
              <Header className="header">
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["2"]}
                >
                  <Menu.Item key="1">Home</Menu.Item>
                  <Menu.Item key="2">About</Menu.Item>
                  <Menu.Item key="3">Pricing</Menu.Item>
                </Menu>
              </Header>
              <Layout>
                <Sider width={200} className="site-layout-background">
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ height: "100%", borderRight: 0 }}
                  >
                    <SubMenu key="sub1" icon={<AiOutlineUser />} title="Staff">
                      <Menu.Item key="1">
                        <Link to="/">All Staff</Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link to="/create">Create Staff</Link>
                      </Menu.Item>
                      {/* <Menu.Item key="3">
                    <Link to="/edit">Edit Staff</Link>
                  </Menu.Item> */}
                    </SubMenu>
                    <Menu.Item key="sub2" icon={<AiOutlineLaptop />}>
                      Product
                    </Menu.Item>
                    <Menu.Item key="sub3" icon={<AiOutlineNotification />}>
                      Statistics
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                  <Content
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      margin: 0,
                      minHeight: "85vh",
                      background: "#fff",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/create" element={<Create />} />
                      <Route path="/edit/:userId" element={<Edit />} />
                      <Route path="*" element={<ErrorPage />} />
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
