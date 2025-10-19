import React, { useEffect, useState } from 'react';
import { Layout, Typography, Spin, Table, Button, Input, Space, message, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';
import { getAllTasks, api } from './services/api';
import TaskForm from './components/TaskForm';
import RunTaskModal from './components/RunTaskModal';

const { Header, Content, Footer } = Layout;

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
}

export default function App() {
  const { token } = theme.useToken();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [runOutput, setRunOutput] = useState('');
  const [showRunModal, setShowRunModal] = useState(false);

  const columns: ColumnsType<Task> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Command', dataIndex: 'command', key: 'command' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="default" onClick={() => handleRun(record.id)}>
            Run
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getAllTasks();
      if (data) setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      loadTasks();
      return;
    }
    const filtered = tasks.filter(task =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTasks(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      message.success('Task deleted');
      loadTasks();
    } catch (err) {
      message.error('Delete failed');
      console.error(err);
    }
  };

  const handleRun = async (id: string) => {
    try {
      const res = await api.put(`/tasks/${id}/execute`);
      const output = res.data?.output || 'No output returned';
      setRunOutput(output);
      setShowRunModal(true);
      message.success('Task executed');
    } catch (err) {
      message.error('Execution failed');
      console.error(err);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: 18 }}>
        Kaiburr Task 3 — Frontend UI (Ant Design + React + TS)
      </Header>

      <Content
        style={{
          padding: 24,
          background: token.colorBgContainer,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top bar with Create and Search */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: 900,
            marginBottom: 20,
          }}
        >
          <Typography.Title level={2} style={{ margin: 0 }}>
            All Tasks 📋
          </Typography.Title>

          <Space>
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 200 }}
            />
            <Button onClick={handleSearch}>Search</Button>
            <Button type="primary" onClick={() => setShowModal(true)}>
              + Create Task
            </Button>
          </Space>
        </div>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={tasks}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
            style={{ width: '100%', maxWidth: 900 }}
          />
        )}

        <TaskForm
          visible={showModal}
          onClose={() => setShowModal(false)}
          onCreated={loadTasks}
        />

        <RunTaskModal
          visible={showRunModal}
          onClose={() => setShowRunModal(false)}
          output={runOutput}
        />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        © 2025 Pranav Biju Nair | Kaiburr Task 3
      </Footer>
    </Layout>
  );
}
