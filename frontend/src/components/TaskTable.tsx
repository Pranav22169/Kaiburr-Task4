import { useEffect, useState } from 'react';
import { Table, Spin, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllTasks } from '../services/api';

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    const data = await getAllTasks();
    if (data) setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const columns: ColumnsType<Task> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Command', dataIndex: 'command', key: 'command' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 800 }}>
      <Typography.Title level={3}>All Tasks</Typography.Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={tasks}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default TaskTable;

