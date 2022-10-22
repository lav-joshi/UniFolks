import React, { useEffect, useState } from "react";
import axios from 'axios'
import Chat from "../Chat";
import {useLocation} from "react-router-dom";
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

const ChatGround = () => {

    const [selectedFriend, setSelectedFriend] = useState("");
    const [friends, setFriends] = useState([]);

    // get all friends from server
    useEffect(()=>{
        createHeader().get("/api/user/getFriends").then((res)=>{
            setFriends(res.data.friends)
        }).catch((e)=>{
            
        })    
    },[])

  return (
    <div>
        Hello Chat Ground
        {
            friends.map((val,idx)=>{
                return <div onClick={(e) => setSelectedFriend(val)}> {val} </div>
            })
        }
        {
            selectedFriend ?  <Chat userId = {cookies.get("email")} friendId = {selectedFriend}/> :<></>
        }
    </div>
  );
};



export default ChatGround