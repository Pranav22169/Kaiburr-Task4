import { Modal, Typography } from 'antd';

type Props = {
  visible: boolean;
  onClose: () => void;
  output: string;
};

export default function RunTaskModal({ visible, onClose, output }: Props) {
  return (
    <Modal
      title="Task Execution Output"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Typography.Paragraph>
        <pre>{output || 'No output available'}</pre>
      </Typography.Paragraph>
    </Modal>
  );
}

