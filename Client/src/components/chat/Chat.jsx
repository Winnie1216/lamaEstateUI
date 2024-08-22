// import { useContext, useState, useEffect, useRef } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import "./chat.scss";
// import axios from "axios";
// import { format } from "timeago.js";
// import { SocketContext } from "../../context/socketContext";

// function Chat({ chats: initialChats }) {
//   const [chats, setChats] = useState(initialChats); // 在组件内部管理 chats 状态
//   const [chat, setChat] = useState(null);
//   const { currentUser } = useContext(AuthContext);
//   const { socket } = useContext(SocketContext);
//   const messagesEndRef = useRef(null); // 创建一个引用指向消息容器底部

//   console.log(chats);

//   const handleOpenChat = async (id) => {
//     try {
//       const res = await axios.get(`http://localhost:8800/api/chats/${id}`, {
//         withCredentials: true,
//       });

//       setChat({ ...res.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const text = formData.get("text");

//     if (!text) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:8800/api/messages/${chat.id}`,
//         { text },
//         {
//           withCredentials: true,
//         }
//       );

//       const newMessage = res.data;

//       setChat((prev) => ({
//         ...prev,
//         messages: [...prev.messages, newMessage],
//       }));

//       // 更新 chats 列表中的 lastMessage
//       setChats((prevChats) =>
//         prevChats.map((c) =>
//           c.id === chat.id ? { ...c, lastMessage: newMessage.text } : c
//         )
//       );

//       e.target.reset();

//       socket.emit("sendMessage", {
//         receiverId: chat.receiver?.id,
//         data: newMessage,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 在每次 chat.messages 更新后自动滚动到底部
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chat?.messages]);

//   return (
//     <div className="chat">
//       <div
//         className="messages"
//         onClick={() => {
//           setChat(null);
//         }}
//       >
//         <h1>Messages</h1>
//         {chats?.map((c) => {
//           // 检查 c.receiver 是否存在
//           if (!c.receiver) {
//             return null; // 如果 receiver 不存在，跳过这个条目
//           }

//           return (
//             <div
//               className="message"
//               key={c.id}
//               style={{
//                 backgroundColor:
//                   c.seenBy.includes(currentUser.id) || chat?.id === c.id
//                     ? "white"
//                     : "#fecd514e",
//               }}
//               onClick={() => handleOpenChat(c.id)}
//             >
//               <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
//               <span>{c.receiver.username}</span>
//               <p>{c.lastMessage}</p>
//             </div>
//           );
//         })}
//       </div>
//       {chat && (
//         <div className="chatBox">
//           <div className="top">
//             <span
//               className="close"
//               onClick={() => {
//                 setChat(null);
//               }}
//             >
//               X
//             </span>
//           </div>
//           <div className="center">
//             {chat.messages.map((message) => (
//               <div
//                 className="chatMessage"
//                 style={{
//                   alignSelf:
//                     message.userId === currentUser.id
//                       ? "flex-end"
//                       : "flex-start",
//                   textAlign:
//                     message.userId === currentUser.id ? "right" : "left",
//                 }}
//                 key={message.id}
//               >
//                 <p>{message.text}</p>
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             ))}
//             {/* 将一个不可见的 div 放在消息列表的末尾 */}
//             <div ref={messagesEndRef} />
//           </div>
//           <form onSubmit={handleSubmit} className="bottom">
//             <textarea name="text" id=""></textarea>
//             <button>Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chat.scss";
import axios from "axios";
import { format } from "timeago.js";
import { SocketContext } from "../../context/socketContext";

function Chat({ chats: initialChats }) {
  const [chats, setChats] = useState(initialChats); // 在组件内部管理 chats 状态
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messagesEndRef = useRef(null); // 创建一个引用指向消息容器底部

  console.log(chats);

  const handleOpenChat = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8800/api/chats/${id}`, {
        withCredentials: true,
      });

      setChat({ ...res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await axios.post(
        `http://localhost:8800/api/messages/${chat.id}`,
        { text },
        {
          withCredentials: true,
        }
      );

      const newMessage = res.data;

      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      // 更新 chats 列表中的 lastMessage
      setChats((prevChats) =>
        prevChats.map((c) =>
          c.id === chat.id ? { ...c, lastMessage: newMessage.text } : c
        )
      );

      e.target.reset();

      socket.emit("sendMessage", {
        receiverId: chat.receiver?.id,
        data: newMessage,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 在每次 chat.messages 更新后自动滚动到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  // 在 messages 部分只显示最新的一条消息
  const latestChats = chats.reduce((acc, chat) => {
    if (!chat.receiver) return acc;

    const existingChat = acc.find((c) => c.receiver.id === chat.receiver.id);
    if (!existingChat) {
      acc.push(chat);
    } else {
      if (new Date(chat.updatedAt) > new Date(existingChat.updatedAt)) {
        const index = acc.indexOf(existingChat);
        acc[index] = chat;
      }
    }
    return acc;
  }, []);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {latestChats.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id)}
          >
            <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <span
              className="close"
              onClick={() => {
                setChat(null);
              }}
            >
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" id=""></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
