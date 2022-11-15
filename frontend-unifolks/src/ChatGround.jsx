import React, { useEffect, useState } from "react";
import axios from 'axios'
import ChatMessages from "./components/ChatMessages";
import {useLocation} from "react-router-dom";
import Cookies from 'universal-cookie';
import { Card, Paper } from "@material-ui/core";

const cookies = new Cookies();
const createHeader = () => {
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_HOST,
        headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            email: cookies.get("email"),
            "Content-Type" : 'application/json'
        }
    });
    return authAxios;
}

const ChatGround = () => {

    const [selectedFriend, setSelectedFriend] = useState(false);
    const [selectedFriendDetails, setSelectedFriendDetails] = useState({name : "" , email : "" , picture : ""});
    const [friends, setFriends] = useState([]);

    useEffect(()=>{
        createHeader().get("/api/user/getFriends").then((res)=>{
            setFriends(res.data.friends)
            console.log(res.data.friends)
        }).catch((e)=>{
            
        })    
    },[])

    const handleSelectedFriend = (val) => {
        setSelectedFriend(true)
        setSelectedFriendDetails(val)
    }

  return (
        <div class="chatground">
        <div class="background">
          
        <div className="chat-header">
              {selectedFriendDetails.name? selectedFriendDetails.name: ""}
            </div>
          <div class="main-box">
            <div class="user-lists">
              {
                friends.map((val, idx) => {
                  return (
                      <Card className="user-modal" key = {val.email} onClick={(e) => handleSelectedFriend(val)}> {val.name} </Card>
                  )
                })
              }
            </div>
            <div class="conversation-box">
              {
                selectedFriend ? 
                <ChatMessages userId = {cookies.get("email")} friend = {selectedFriendDetails}/>
                : <div class="empty-box">
                  Kindly select a person to view messages 
                </div>
              }
            </div>        
          </div>
        </div>
        </div>
    //  <div class="container">
    //     Hello ChatMessages Ground
    //     {
    //         friends.map((val,idx)=>{
    //             return <div key = {val.email} onClick={(e) => handleSelectedFriend(val)}> {val.name} {val.email} </div>
    //         })
    //     }
    //     {
    //         selectedFriend ?  <ChatMessages userId = {cookies.get("email")} friend = {selectedFriendDetails}/> :<></>
    //     }
    // </div>
  );
};



export default ChatGround