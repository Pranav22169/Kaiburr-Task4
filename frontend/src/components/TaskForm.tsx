import { Modal, Form, Input, Button, message } from 'antd';
import { api } from '../services/api';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function TaskForm({ visible, onClose, onCreated }: Props) {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await api.put('/tasks', values);
      message.success('Task created successfully');
      onCreated();
      onClose();
    } catch (err) {
      message.error('Failed to create task');
      console.error(err);
    }
  };

  return (
    <Modal
      title="Create New Task"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Task ID" name="id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Task Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Owner" name="owner" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Command" name="command" rules={[{ required: true }]}>
          <Input placeholder="Example: echo Hello Kaiburr" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

