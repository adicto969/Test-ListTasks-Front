import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import './layout.css';
import 'antd/dist/antd.css';
import {
    BrowserRouter as Router,
    Switch,
    Link
} from "react-router-dom";
import Tasks from '../component/tasks/tasks';
import Register from '../component/register/register';
import Login from '../component/login/login';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, changeRoute } from '../features/layoutSlice';
import { history } from '../utils/history';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { authenticationService } from '../services/authentication.service';

const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
        if (authenticationService.logged) {
            next();
        }

        next.redirect('/login');
    } else {
        next();
    }
}

const { Header, Sider, Content } = Layout;

export function LayoutApp() {

    const [islogged, setLogged]= useState(false);
    const { activeRoute, collapsedMenu } = useSelector((state) => state.layout);
    const dispatch = useDispatch();

    useEffect(() => {
        authenticationService.loggedObservable.subscribe(logg => {
            if (islogged != logg) {
                setLogged(logg);
            }
        });

        authenticationService.refreshLogged();
    });

    const logout = () => {
        authenticationService.logout();
    }

    return (
        <Router history={history()}>
        <Layout className="content">
        <Sider trigger={null} collapsible collapsed={collapsedMenu}>
          <div className="logo" >
            <p>{ authenticationService.logged ? authenticationService.currentUserValue.name : 'BIENVENIDO'}</p>
          </div>
          {/** onClick={(key) => dispatch(changeRoute(key)) } */}
          <Menu  theme="dark" mode="inline" defaultSelectedKeys={[activeRoute]} >
            <Menu.Item key="index" icon={<UserOutlined />}>
                <Link to="/">
                    Tareas
                </Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<VideoCameraOutlined />}>
                <Link to="/register">
                    Registro
                </Link>
            </Menu.Item>
            
            {
                authenticationService.logged &&
                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                    Salir
                </Menu.Item>
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsedMenu ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => dispatch(toggle()),
            })}
          </Header>
          <Content className="site-layout-background content-app" style={{ margin: '24px 16px', padding: 24, minHeight: 400 }}>

            <GuardProvider guards={[(to, from, next) => {
                requireLogin(to, from, next);
                const path = from.location.pathname;
                dispatch(changeRoute(path === '/login' || path === '/' ? 'index' : path.split('/')));
            }]}>
                <Switch>
                     { authenticationService.logged ? <GuardedRoute exact path="/" component={Tasks} meta={{ auth: true }} />
                     : <GuardedRoute exact path="/" component={Login} meta={{ auth: true }} /> }
                    <GuardedRoute exact path="/register" component={Register} />
                    <GuardedRoute exact path="/login" component={Login} />
                </Switch>
            </GuardProvider>

          </Content>
        </Layout>
        </Layout>
      </Router>
    );
}

export default LayoutApp;