import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from 'axios'
import Cookies from 'universal-cookie';
import send from "../assets/send.png";

const cookies = new Cookies();
const createHeader = () => {
    const authAxios = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            email: cookies.get("email"),
            "Content-Type" : 'application/json'
        }
    });
    return authAxios;
}

let socket;

const Chat = (props) => {

  // Props contain 
  // {
  //   userId -> mail id of current user
  //   friend {
  //     name
  //     picture 
  //     email
  //   }
  // }
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {

    if(socket){
        socket.disconnect();
        socket.emit('disconnector',{})
    }

    socket = io(ENDPOINT);
    socket.emit("join", { email: props.userId}, (error) => {
      if (error) {
        alert(error);
      }
    });
    setMessages([]);
  }, [props]);

    // Get all messages from the server for this friend
  useEffect(() => {
    createHeader().post("/api/user/getMessages", {userId: props.userId, friendId: props.friend.email}).then((res)=>{
      setMessages(res.data.messages)
    }).catch((e)=>{
        
    })    
  }, [props])

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, {sender : message.userId ,message : message.message}]);
    });
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message, userId: props.userId, friendId : props.friend.email });
      setMessage("");
    } else alert("empty input");
  };

  return (
    <>
      {/* <div>Chat Page {props.userId} {props.friend.name}</div> */}
      <div className="conv-wrapper">
        <div className="conversations">
          {
            messages.map((val, i) => {
              return (
                <>
                {
                  (val.sender == cookies.get("email"))?
                    <div class="message-box user" key={i} >
                      <span class="message user">{val.message}</span>
                      {/* Time lagana hain  */}
                    </div>
                    :
                    <div className="message-box other-user">
                      <span class="message other-user">{val.message}</span>
                    </div>
                }
                </>
              );
            })
          }
        </div>
      </div>
      <form className="message-input" action="" onSubmit={handleSubmit}>
        <input
          class="form-control"
          type="text"
          value={message}
          placeholder="Write Message... "
          onChange={(e) => setMessage(e.target.value)}
        />
        <button id="send-button" type="submit"><img src={send} style={{width:10, height:10}} alt="Send"/></button>
      </form>
    </>
  );
};

export default Chat