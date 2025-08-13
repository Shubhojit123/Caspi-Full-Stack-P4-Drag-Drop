import React, { useState, useEffect } from "react";
import { List, Typography, Divider, message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

function ListView({ values }) {
  const [data, setData] = useState(values);
  const [messageApi,contextHolder] = message.useMessage();


  useEffect(() => {
    setData(values);
  }, [values]);
  let containerId;
  let startConatiner;
  function handelDrage(e, id, sourseContainer) {
    containerId = id;
    startConatiner = sourseContainer;
    console.log(startConatiner);
    e.target.style.opacity = "0.5"
  }

  function handelDrageEnd(e) {
    e.target.style.opacity = "1"
  }

  function handelDrageOver(e) {
    e.preventDefault();
  }


  const handelDrop = async (e, container) => {
    e.preventDefault();
    const putData = { state: container, id: containerId };

    try {
      await axios.put(`http://localhost:4000/api/edit`, putData);

      setData(prev => {
        let draggedItem;

        const newData = Object.fromEntries(
          Object.entries(prev).map(([key, items]) => {
            const filtered = items.filter(item => {
              if (item._id === containerId) {
                draggedItem = { ...item, state: container };
                return false;
              }
              return true;
            });
            return [key, filtered];
          })
        );

        if (draggedItem) {
          newData[container] = [...(newData[container] || []), draggedItem];
        }

        return newData;
      });
      if (startConatiner !== container) {
        messageApi.open({
          type: 'success',
          content: `Added Successfully in ${container}`,
        });
      }


    } catch (error) {
      messageApi.open({
          type: 'error',
          content: `Added Successfully in ${container}`,
        });
      console.error(error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
       {contextHolder}
      {Object.keys(data || {}).map((container, index) => (
        <div key={index} style={{ marginBottom: "30px" }}
          onDragOver={handelDrageOver}
          onDrop={(e) => { handelDrop(e, container) }}
        >
          <Divider orientation="left">
            <Typography.Title level={4} style={{ margin: 0 }}>
              {container}
            </Typography.Title>
          </Divider>

          <List
            bordered
            dataSource={data[container] || []}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: "move" }}
                draggable
                onDragStart={(e) => { handelDrage(e, item._id, item.state) }}
                onDragEnd={handelDrageEnd}
              >
                <div >
                  <p><b>Title:</b> {item.title}</p>
                  <p><b>User:</b> {item.username}</p>
                  <p><b>Date:</b> {new Date(item.createdAt).toLocaleString()}</p>
                  <p><b>Status:</b> {item.state}</p>
                </div>
              </List.Item>
            )}
          />
        </div>
      ))}
    </div>
  );
}

export default ListView;
