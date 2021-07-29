import { message, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { authenticationService } from '../../services/authentication.service';
import {
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import './tasks.css';
import Column from 'antd/lib/table/Column';
import Modal from 'antd/lib/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModel, setTasks, showOrHideModel, updateStatusData } from '../../features/tasksSlice';
import { Form, Input, Button, DatePicker, Switch } from 'antd';
import moment from 'moment';
import { taskservice } from '../../services/tasks.service';

export function Tasks() {

  const [ form ] = Form.useForm();

    let { showModel, task, tasks, statusData } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!authenticationService.logged) {
        this.props.history.push('/login');
      }

      if (!statusData) {
        dispatch(updateStatusData());
        getData();
      }
    });

    const getData = () => {
      taskservice.get().then(
        response => {
          dispatch(setTasks(response.data));
        },
        err => {
          message.error('Intentelo mas tarde');
        }
      );
    }

    const handleOk = () => {
      form.submit();
    }

    const handleCancel = () => {
      dispatch(showOrHideModel());
    }

    const openModel = (task) => {
      const newtask = {
        _id: task._id,
        name: task.name,
        expirationDate: moment(task.expirationDate, 'YYYY-MM-DD'),
        completed: task.completed
      };

      dispatch(setModel(newtask));
      dispatch(showOrHideModel());
      form.setFieldsValue(newtask);
    } 

    const changeComplete = (value, eve) => {
      dispatch(setModel({
        _id: task._id,
        name: task.name,
        expirationDate: task.expirationDate,
        completed: value
      }));
    }

    const onFinish = (values) => {
      values._id = task._id;
      dispatch(showOrHideModel());

      if (values._id) {
        const request = taskservice.update(values).then(
          response => {
            message.success('Tarea actualizada');
            getData();
          },
          err => {
            message.error('Verifica tus datos');
          }
        );
      } else {
        const request = taskservice.create(values).then(
          response => {
            message.success('Tarea creada');
            getData();
          },
          err => {
            message.error('Verifica tus datos');
          }
        );
      }
    };

    return (<div>
            <div className="sec-title">
              <p>TAREAS</p>
              <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => openModel({
                  id: '',
                  name: '',
                  expirationDate: new Date(),
                  completed: false
                })} />
            </div> 
            <Table dataSource={tasks}>
              <Column title='ID' dataIndex="_id" key="id" />
              <Column title='Nombre' dataIndex="name" key="name" />
              <Column title='Fecha Termino' dataIndex="expirationDate" key="expirationDate" />
              <Column title='Completado' key="completed" render={(text, record) => (
                record.completed ? <Tag color="success">Terminada</Tag> : <Tag color="processing">En Processo</Tag>
              )} />
              <Column title='Acciones' key="actions" render={(text, record) => (
                <Button type="primary" shape="round" icon={<EditOutlined />} size={40} onClick={() => openModel(record) }>
                  Editar
                </Button>
              )}/>
            </Table>

            <Modal title="Tarea" visible={showModel} onOk={handleOk} onCancel={handleCancel}>
              <Form
                layout="vertical"
                name="tasks_form"
                className="login-form"
                form={form}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Nombre de la tarea"
                  name="name"
                  rules={[{ required: true, message: 'Ingresa un nombre' }]}
                >
                  <Input placeholder="Nombre"/>
                </Form.Item>

                <Form.Item 
                  label="Fecha de Vencimiento"
                  name="expirationDate"
                  rules={[{ required: true, message: 'Por favor seleccione una fecha' }]}>
                  <DatePicker  placeholder="Seleccione una fecha" />
                </Form.Item>

                <Form.Item label="Completada" name="completed">
                  <Switch checked={task.completed} onChange={changeComplete}/>
                </Form.Item>
              </Form>
            </Modal>
        </div>
    );
    
}

export default Tasks;