import { useTab } from '@mui/base';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
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

const checkIntersection = (tags, userTags) => {
    const fruits = new Map();

    let tagsSplit = tags.split(',');
    for(let i = 0 ; i < tagsSplit.length; i++){
        fruits.set(tagsSplit[i] , 1);
    }

    for(let i = 0 ; i< userTags.length; i++){
        if(fruits.has(userTags[i])){

        }else{
            return false;
        }
    }
    return true;
}

export default function Search(){
    
    const [allUsers, setAllUsers] = useState([]); 
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [tags , setTags] = useState("");

    useEffect(()=>{
        createHeader().get("/api/user/allusers").then((res)=>{
            setAllUsers(res.data.users)
            console.log(res.data.users)
        }).catch((e)=>{
            
        })    
    },[])

    useEffect(()=>{
        let users = [];

        for(let  i = 0 ; i < allUsers.length; i++) {
            if((!name || allUsers[i].name === name) && 
            (!city || allUsers[i].city === city) && 
            (!bloodGroup || allUsers[i].bloodGroup === bloodGroup) &&
            (!tags || checkIntersection(tags, allUsers[i].tags))
            ){
                users.push(allUsers[i])
            }
        }  
        setFilteredUsers(users) 
    },[bloodGroup, city, name, tags])

    return (<>This is search Page</>)
}