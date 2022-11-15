import { useTab } from "@mui/base";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import Grid from "@mui/material/Grid";
import searchBg from "../images/search-bg.svg";
import avatar from '../images/avatar.webp';
import { Box } from "@mui/system";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';

import {
  MenuItem,
  TextField,
  Select,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Dialog,
  Alert,
} from "@mui/material";
import CustomNode from './CustomNode';
import { Button, InputAdornment } from "@material-ui/core";

const cookies = new Cookies();
const createHeader = () => {
  const authAxios = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
      email: cookies.get("email"),
      "Content-Type": "application/json",
    },
  });
  return authAxios;
};

const checkIntersection = (tags, userTags) => {

  if (userTags.length === 0 || tags === "") return false;
  const fruits = new Map();

  let tagsSplit = tags.split(",");
  for (let i = 0; i < tagsSplit.length; i++) {
    fruits.set(tagsSplit[i], 1);
  }
  
  for (let i = 0; i < userTags.length; i++) {
    for (let [key, value] of fruits) {
        if(userTags[i].toLowerCase().startsWith(key.toLowerCase())){
            return true
        }
    }
  }

  return false;
};

export default function Search() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("Blood Group");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  
  useEffect(() => {
    createHeader()
    .get("/api/user/allusers")
      .then((res) => {
        setAllUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((e) => {});
    }, []);

    useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    console.log("called", name, city, bloodGroup, tags);
    let selected = [];
    let users = allUsers.filter(
      (user) =>
      (name === "" ||
          user.name.toLowerCase().startsWith(name.toLowerCase())) &&
        (city === "" ||
        (user.city
            ? user.city.toLowerCase().startsWith(city.toLowerCase())
            : false)) &&
            (bloodGroup === "Blood Group" ||
            (user.bloodGroup
              ? user.bloodGroup.toLowerCase().startsWith(bloodGroup.toLowerCase())
            : false)) &&
            (tags === "" || checkIntersection(tags, user.tags))
    );

    setFilteredUsers(users);
  }, [bloodGroup, city, name, tags]);
  
  const [alertData, setAlert] = useState({show: false, content: "", severity: ""});
  const handleAddFriend = (friendId) => {
    createHeader()
    .post("/api/user/addFriend", {friendId})
      .then((res) => {
        setAlert({show: true, content:res.data.message, severity: "success"});
      })
      .catch(({ response }) => { 
        console.log(response);
    });
    };
  return (
    <>
        <Dialog open={alertData.show}>
            {alertData.show? <Alert autoFocus variant="outlined" onClose={() => {setAlert({show: false})}} severity={alertData.severity} >
            {alertData.content}
        </Alert> :
        <></>}
      </Dialog>
      <h1>Hey, We Got you!</h1>
      <p>Search anyone you want</p>

      <Grid container spacing={2} >
        <Grid item xs={8}>
          <Grid container gap={1}>
            <Grid item xs={6}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                MenuProps={{ width: "100%" }}
                value={bloodGroup}
                label="Blood Group"
                onChange={(e) => {
                  console.log(e.target.value);
                  setBloodGroup(e.target.value);
                }}
                sx={{ background: 'white', width: '20rem' } }
              >
                <MenuItem value="Blood Group">Blood Group</MenuItem>
                <MenuItem value="A positive">A Positive</MenuItem>
                <MenuItem value="A Negative">A Negative</MenuItem>

                <MenuItem value="B Positive">B Positive</MenuItem>
                <MenuItem value="B Negative">B Negative</MenuItem>

                <MenuItem value="AB positive">AB Positive</MenuItem>
                <MenuItem value="AB Negative">AB Negative</MenuItem>

                <MenuItem value="O Positive">O Positive</MenuItem>
                <MenuItem value="O Negative">O Negative</MenuItem>

                <MenuItem value="Unknown">Unknown</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={5}>
              <TextField
                type="text"
                value={city}
                sx={{ input: { background: 'white' } , width: '20rem'}}
                placeholder={"City"}
                onChange={(e) => setCity(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                value={name}
                sx={{ input: { background: 'white', paddingLeft: '1rem' }, width: '20rem' }}
                placeholder={"Name"}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                type="text"
                sx={{ input: { background: 'white', paddingLeft: '1rem' } , width: '20rem'}}
                value={tags}
                placeholder={"Tags"}
                onChange={(e) => setTags(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
              />
            </Grid>

            <Box sx={{display: 'flex', padding: '1rem', flexWrap: 'wrap'}}>
              {filteredUsers.map((user, id) => {
                return (      
                      <Card sx={{ display: 'flex', margin: '1rem' }} className="searchNode">
                        <Box sx={{ display: 'flex'}}>
                          <CardContent sx={{display: 'flex', minWidth: '10rem', justifyItems: "space-around", alignItems: "space-around", flexDirection: "column"}}>
                            <Typography component="div">
                              {user.designation} 
                            </Typography>
                            <Typography style={{fontSize: "small"}} color="secondary" component="div">
                              {user.name}
                            </Typography>
                            <Typography style={{fontSize: "small"}} color="secondary" component="a" to={`mailto:${user.email}`}>
                              {user.email}
                            </Typography>
                            <br></br>
                          </CardContent>
                          <Button variant="contained" className="addfriend-button" onClick={e => handleAddFriend(user.email)} >
                            <PersonAddIcon />
                          </Button>
                        <CardMedia
                          component="img"
                          style={{ width: 90 }}
                          image={user.picture? user.picture: avatar}
                          alt={user.designation}
                        />
                        </Box>
                    </Card>
                )
                
                ;
              })}
              
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Box
            flex
            width={"100%"}
            height={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img style={{ width: "100%" }} src={searchBg} alt="" srcset="" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
