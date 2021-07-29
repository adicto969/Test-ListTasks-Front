import React from 'react';
import { Form, Input, Button, Card, Col, Row, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import './register.css';
import { usersService } from '../../services/users.service';
import { message } from 'antd';
import { Link } from 'react-router-dom';

class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    onFinish = (values) => {
        usersService.register(values.name, values.email, values.password).then(
            response => {
                message.success('Registro exitoso');
                this.props.history.push('/');
            }, 
            err => {
                message.error('Verifica sus datos');
            }
        )
    };

    render() {

        return <Row>
            <Col span={8} offset={8}>
                <Card>
                    <Title level={4}>REGISTRARSE</Title>
                    <Divider plain></Divider>
                    <Form
                        name="register"
                        className="register-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa tu nombre',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa un correo eléctronico',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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

                        <Form.Item labelAlign={'right'}>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                REGISTRARME
                            </Button>
                        </Form.Item>

                        <Link to="/login">Login</Link>
                    </Form>
                </Card>               
            </Col>
        </Row>
    };
}

export default Register;