import React, { useState, useEffect } from "react";
import { Card, Result, message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

function DragAndDrop({ values }) {
  const [data, setData] = useState(values);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setData(values || {});
  }, [values]);

  let containerId;
  let startContainer;
  function handelDrag(e, id, startConatiner) {
    startContainer = startConatiner;
    console.log(startConatiner);
    e.target.style.opacity = "0.5"
    containerId = id;
    console.log(id);
  }

  function handelDragEnd(e) {
    e.target.style.opacity = "1"
  }

  async function handelDrop(e, container) {
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
      if (startContainer !== container) {
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


  function handelDragOver(e) {
    e.preventDefault()
  }

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {contextHolder}
      {Object.keys(data || {}).map((container, index) => (
        <div key={index} style={{ flex: 1 }}
          onDragOver={handelDragOver}
          onDrop={(e) => handelDrop(e, container)}
        >
          <h1 style={{ textAlign: "center" }}>{container}</h1>
          {(data[container] || []).map((item, idx) => {
            return (
              <Card

                key={idx}
                draggable
                onDragStart={(e) => handelDrag(e, item._id, item.state)}
                onDragEnd={handelDragEnd}
                title={item.title}
                style={{ marginBottom: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", cursor: "move", userSelect: "none" }}
              >
                <p><b>User:</b> {item.username}</p>
                <p><b>Date:</b> {new Date(item.createdAt).toLocaleString()}</p>
                <p><b>Status:</b> {item.state}</p>
              </Card>
            )
          })}
        </div>
      ))}
    </div>
  );
}

export default DragAndDrop;
