import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from 'axios'
import Cookies from 'universal-cookie';

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
    createHeader().post("/api/user/getMessages", {userId: props.userId, friendId: props.friendId}).then((res)=>{
        setMessages(res.data.messages)
    }).catch((e)=>{
        
    })    
  }, [props])

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, {senderName : "Lav", message : message}]);
    });
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message, userId: props.userId, friendId : props.friendId });
      setMessage("");
    } else alert("empty input");
  };

  return (
    <>
      <div>Chat Page {props.userId} {props.friendId}</div>
      <div className="conv-wrapper">
        <div className="conversations">
          {
            messages.map((val, i) => {
              return (
                <>
                {
                    val.message
                }
                {/* {
                  (val.senderName == name)?
                    <div class="message-box user" key={i} >
                      <span class="sender-name user">You</span>
                      <span class="message user">{val.message}</span>
                    </div>
                    :
                    <div className="message-box other-user">
                      <span class="sender-name other-user">{val.senderName}</span>
                      <span class="message other-user">{val.message}</span>
                    </div>
                } */}
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
        <button id="send-button" type="submit"><i class="fa fa-paper-plane" aria-hidden="true">Send</i></button>
      </form>
    </>
  );
};

export default Chat