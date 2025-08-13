import { useEffect, useState,useMemo } from 'react'
import './App.css'
import axios from 'axios';
import { Layout, Button, Modal, Form, Input } from "antd";
import { toast } from 'react-toastify';
const { Header } = Layout
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import DragAndDrop from './DragAndDrop';
import List from './List';


function App() {
  const URL = `http://localhost:3000/api`;
  const [data, setData] = useState(null);
  const [todo, setTodo] = useState(null);
  const [isProgress, setInProgress] = useState(null);
  const [disucss, setDiscuss] = useState(null);
  const [deployed, setDeployed] = useState(null);
  const fetechData = async () => {
    await axios.get("http://localhost:3000/api/get")
      .then(async (result) => {
        const data = result.data.msg;
        const revData = data.reverse();
        setData(revData);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const dividedData = () => {
    if (!data) return;
    const TodoData = data.filter((datas) => {
      return datas.state === "Todo"
    });
    const ProcessData = data.filter((datas) => {
      return datas.state === "in Process"
    });
    const DicussionData = data.filter((datas) => {
      return datas.state === "Need To Discuess"
    });
    const DeployData = data.filter((datas) => {
      return datas.state === "Deployed"
    });

    setTodo(TodoData);
    setInProgress(ProcessData);
    setDeployed(DeployData);
    setDiscuss(DicussionData);

  }
  useEffect(() => {
    fetechData();
  }, [DragAndDrop]);

  useEffect(() => {
    if (data) dividedData();
  }, [data]);

  const UserData = useMemo(() => ({
    "Todo": todo,
    "in Process": isProgress,
    "Need To Discuess": disucss,
    Deployed: deployed
  }), [todo, isProgress, disucss, deployed]);

  const [openModel, setOpenModel] = useState(false);

  function handleOpen() {
    setOpenModel(true);
  }

  function handelClose() {
    form.resetFields();
    setOpenModel(false);
  }

  const [form] = Form.useForm();

  const handelSave = async (values) => {
    await axios.post(`${URL}/create`, values)
      .then(() => {
        toast.success("Todo Added");
        fetechData();
        handelClose();
      })
      .catch((error) => {
        toast.error("Server error")
        console.log(error);
      })
  }

    const [isKanban, setIsKanban] = useState(false);

  const handleChange = (value) => {
    if (value === "Kanban") {
      setIsKanban(true);
    } else {
      setIsKanban(false);
    }
  };




  return (
    <>
      <Layout>
        <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#001529",
          padding: "0 20px"
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>Todo App</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button type="primary" onClick={handleOpen}>
            + Add Todo
          </Button>
          <Segmented type='primary'
            options={[
              { value: "List", icon: <BarsOutlined /> },
              { value: "Kanban", icon: <AppstoreOutlined /> },
            ]}
            onChange={handleChange}
          />
        </div>
      </Header>


        <Modal
          title="Add Task"
          open={openModel}
          onCancel={handelClose}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handelSave}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input placeholder="Enter todo title" />
            </Form.Item>

            <Form.Item
              label="username"
              name="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input placeholder='Enter Username' />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save Todo
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>

         {isKanban ? ( <DragAndDrop values={UserData}></DragAndDrop>) : (<List values={UserData}/>)}


    </>
  )
}

export default App
