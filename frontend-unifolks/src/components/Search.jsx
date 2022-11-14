import { useTab } from "@mui/base";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import Grid from "@mui/material/Grid";
import searchBg from "../images/search-bg.svg";
import { Box } from "@mui/system";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

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
  console.log("fruits");

  if (userTags.length === 0 || tags === "") return false;
  const fruits = new Map();

  let tagsSplit = tags.split(",");
  for (let i = 0; i < tagsSplit.length; i++) {
    fruits.set(tagsSplit[i], 1);
  }
  console.log(fruits);
  for (let i = 0; i < userTags.length; i++) {
    if (fruits.has(userTags[i])) {
    } else {
      return false;
    }
  }
  return true;
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
    let users = allUsers.filter(
      (user) =>
        (name === "" ||
          user.name.toLowerCase().startsWith(name.toLowerCase())) &&
        (city === "" ||
          (user.city
            ? user.city.toLowerCase().startsWith(city.toLowerCase())
            : true)) &&
        (bloodGroup === "Blood Group" ||
          (user.bloodGroup
            ? user.bloodGroup.toLowerCase().startsWith(bloodGroup.toLowerCase())
            : false)) &&
        (tags === "" || checkIntersection(tags, user.tags))
    );

    setFilteredUsers(users);
  }, [bloodGroup, city, name, tags]);

  return (
    <>
      <h1>Hey, We Got you!</h1>
      <p>Search anyone you want</p>

      <Grid container spacing={2}>
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
              <OutlinedInput
                type="text"
                value={city}
                placeholder={"City"}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                type="text"
                value={name}
                placeholder={"Name"}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <OutlinedInput
                type="text"
                value={tags}
                placeholder={"Tags"}
                onChange={(e) => setTags(e.target.value)}
              />
            </Grid>

            <Grid xs={12}>
              {filteredUsers.map((user, id) => {
                return <Box key={id}>{user.name}</Box>;
              })}
            </Grid>
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
