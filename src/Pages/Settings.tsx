import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const onFinish = (values: { number: number; category: string }) => {
    message.success("Settings configured successfully", 1.5);
    sessionStorage.clear();
    setTimeout(() => {
      navigate(`/quiz?limit=${values.number}`);
    }, 1000);
  };
  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center ">
      <p className="text-center text-2xl font-bold mb-10">
        Take a few moment to set your questions:{" "}
      </p>
      <Form
        onFinish={onFinish}
        layout="horizontal"
        className="flex flex-col items-center justify-center w-5/6"
      >
        <Form.Item
          className="w-80"
          wrapperCol={{ span: 70 }}
          labelCol={{ span: 30 }}
          label={<span className="text-white font-bold text-lg">No. </span>}
          key="number"
          name="number"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input
            name="number"
            type="number"
            placeholder="Number of Questions"
          />
        </Form.Item>
        <Button className="btn" type="primary" htmlType="submit">
          Start
        </Button>
      </Form>
    </main>
  );
};

export default Settings;
