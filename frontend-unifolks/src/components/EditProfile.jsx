import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TextField } from "@material-ui/core";

import image1 from "../images/20943587 (1) 1.png";
const cookies = new Cookies();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function EditProfile() {
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

  const [base64decoded, setBAse64Decoded] = useState("");
  const [file, setFile] = useState();

  const handleFileInput = (event) => {
    const selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedfile);
    reader.onloadend = () => {
      setBAse64Decoded(JSON.stringify({ data: reader.result }));
      setFile(selectedfile);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const x = {
      // Here change email to current user
      email: cookies.get('email'),
      data: base64decoded,
    };

    createHeader(cookies.get("token"))
      .post("/api/user/changePicture", x)
      .then((res) => {
        setFile();
        setBAse64Decoded();
      })
      .catch((e) => {});
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Enter Your Name"
        />
      </div>
      <div>
      <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Enter Contact"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Enter Email"
        />
      </div>
      <div>
      <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Enter Designation"
        />
      </div>
    </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item><img src={image1} alt="" /></Item>
        </Grid>
       
      </Grid>
    </Box>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            <b>Choose DP 😉 </b>{" "}
          </label>
          <input
            type="file"
            onChange={handleFileInput}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Attach File"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          style={{ "margin-bottom": 10 }}
        >
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
}
