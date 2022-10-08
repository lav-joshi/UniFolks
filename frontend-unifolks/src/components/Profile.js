import React, { useEffect } from 'react'
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

const Profile = () => {

    useEffect(()=>{
        createHeader().get("/api/user/hello").then((res)=>{
            console.log(res)
        }).catch((e)=>{
            
        })    
    },[])
  
    return (
        <div>
            Profile Page
        </div>
    )
}

export default Profile