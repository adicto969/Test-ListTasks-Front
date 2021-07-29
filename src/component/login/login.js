import { Card, Col, Row, Divider } from 'antd';
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { Link } from "react-router-dom";
import { authenticationService } from '../../services/authentication.service';
import { message } from 'antd';

class Login extends React.Component {

    constructor(props) {
        super(props);

        if (authenticationService.logged) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        if (authenticationService.logged) {
          this.props.history.push('/');
        }
    }

    onFinish = (values) => {
        authenticationService.login(values.email, values.password).then(
            response => {
                const { from } = this.props.location.state || { from: { pathname: '/' }};
                this.props.history.push(from);
                
                message.success('Logeado');
            }, 
            err => {
                message.error('Verifique sus datos');
            }
        )
    };

    render() {
        return <Row>
            <Col span={8} offset={8}>
                <Card>
                    <Title level={4}>INICIAR SESIÓN</Title>
                    <Divider plain></Divider>
                    <Form
                        name="login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa un correo eléctronico',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa una contraseña',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Contraseña"
                            />
                        </Form.Item>
                        <br />
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                INCIAR
                            </Button> o <Link to="/register">REGISTRARTE</Link>
                        </Form.Item>
                    </Form>

                </Card>
            </Col>
        </Row>;
    }
}

export default Login;