import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "universal-cookie";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { CardMedia, Dialog, FormGroup, TextField } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@material-ui/core";

import avatar from '../images/avatar.webp';
import image1 from "../images/20943587 (1) 1.png";
import { Alert } from "@mui/material";
const cookies = new Cookies();

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
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
    function convertArraytoString(arr) {
        let res = "";
        if (!arr) return res;
        for (let i = 0; i < arr.length; i++) {
            res += arr[i];
            if (i !== arr.length - 1) res += ",";
        }
        return res;
    }
    const [profileFormValues, setProfileValues] = useState({
        name: "",
        city:"",
        designation: "",
        bio: "",
        email: "",
        contact: "",
        urls: "",
        tags: "",
        picture: ""
    });
    useEffect(() => {
        createHeader()
            .post(`/api/user/getProfile/email`, { value: cookies.get("email") })
            .then((res) => {
                console.log(res);
                setProfileValues({
                    name: res.data.name,
                    picture: res.data.picture,
                    designation: res.data.designation,
                    bio: res.data.bio,
                    city : res.data.city,
                    email: res.data.email,
                    contact: res.data.contact,
                    urls: convertArraytoString(res.data.urls),
                    tags: convertArraytoString(res.data.tags),
                });
            });
    }, []);

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
            email: cookies.get("email"),
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

    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // Edit Profile
    const [profileAlert, setProfileAlert] = useState({
        show: false,
        content: "",
        severity: "",
    });

    const inputProfileHandler = (event) => {
        const { name, value } = event.target;
        if (name === "urls") {
            let urls = value.split(",");
            if (urls && urls.length) {
                for (let i = 0; i < urls.length; i += 1) {
                    urls[i] = urls[i].trim();
                }
                setProfileValues({ ...profileFormValues, [name]: urls });
            }
        } else if (name === "tags") {
            let tags = value.split(",");
            if (tags && tags.length) {
                for (let i = 0; i < tags.length; i += 1) {
                    tags[i] = tags[i].trim();
                }
                setProfileValues({ ...profileFormValues, [name]: tags });
            }
        } else {
            setProfileValues({ ...profileFormValues, [name]: value });
        }
    };
    const handleProfileSubmit = () => {
        axios
            .post(
                "http://localhost:5000/api/user/editProfile",
                profileFormValues
            )
            .then((res) => {
                if (res.status === 200) {
                    setProfileAlert({
                        show: true,
                        content: res.data.message,
                        severity: "success",
                    });
                } else {
                    setProfileAlert({
                        show: true,
                        content: res.data.message,
                        severity: "error",
                    });
                }
            })
            .catch(({ response }) => {
                setProfileAlert({
                    show: true,
                    content: response.data.message,
                    severity: "error",
                });
            });
    };

    return (
        <div>
          <Dialog open={profileAlert.show}>
            {profileAlert.show ? (
                <Alert
                    autoFocus
                    variant="outlined"
                    onClose={() => {
                        setProfileAlert({ show: false });
                    }}
                    severity={profileAlert.severity}
                >
                    {profileAlert.content}
                </Alert>
            ) : (
                <></>
            )}
        </Dialog>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                sx={{padding: '1rem'}}
                            >
                                <FormGroup sx={{padding: '1rem', margin: '1rem'}}>
                                <CardMedia
                                  component="img"
                                  style={{ width: 100,}}
                                  image={profileFormValues.picture? profileFormValues.picture: avatar}
                                  alt="Director"
                                />
                          <form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                  <label
                                      for="exampleFormControlInput1"
                                      className="form-label"
                                  >
                                      <b>Update your Profile Picture</b>{" "}
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
                              <Button
                                  type="submit"
                                  variant="contained"
                                  style={{ "margin-bottom": 10 }}
                              >
                                  {" "}
                                  Submit
                              </Button>
                          </form>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="outlined"
                                        name="email"
                                        value={profileFormValues.email}
                                        disabled
                                        onChange={(e) => inputProfileHandler(e)}
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="designation"
                                        label="Designation"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        name="designation"
                                        value={profileFormValues.designation}
                                        onChange={(e) => inputProfileHandler(e)}
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="bio"
                                        label="Bio"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        name="bio"
                                        value={profileFormValues.bio}
                                        onChange={(e) => inputProfileHandler(e)}
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="contact"
                                        label="Contact"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        name="contact"
                                        value={profileFormValues.contact}
                                        onChange={(e) => inputProfileHandler(e)}
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="city"
                                        label="City"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        name="city"
                                        value={profileFormValues.city}
                                        onChange={(e) => inputProfileHandler(e)}
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="urls"
                                        label="URLs"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        name="urls"
                                        value={profileFormValues.urls}
                                        onChange={(e) => inputProfileHandler(e)}
                                    />

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="tags"
                                        label="Tags"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        name="tags"
                                        value={profileFormValues.tags}
                                        onChange={(e) => inputProfileHandler(e)}
                                    />
                                <div>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Blood Group
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="Age"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="A positive">
                                                    A Positive
                                                </MenuItem>
                                                <MenuItem value="A Negative">
                                                    A Negative
                                                </MenuItem>
                                                <MenuItem value="A Unknown">
                                                    A Unknown
                                                </MenuItem>
                                                <MenuItem value="B Positive">
                                                    B Positive
                                                </MenuItem>
                                                <MenuItem value="B Negative">
                                                    B Negative
                                                </MenuItem>
                                                <MenuItem value="B Unknown">
                                                    B Unknown
                                                </MenuItem>
                                                <MenuItem value="AB positive">
                                                    AB Positive
                                                </MenuItem>
                                                <MenuItem value="AB Negative">
                                                    AB Negative
                                                </MenuItem>
                                                <MenuItem value="AB Unknown">
                                                    AB Unknown
                                                </MenuItem>
                                                <MenuItem value="O Positive">
                                                    O Positive
                                                </MenuItem>
                                                <MenuItem value="O Negative">
                                                    O Negative
                                                </MenuItem>
                                                <MenuItem value="O Unknown">
                                                    O Unknown
                                                </MenuItem>
                                                <MenuItem value="Unknown">
                                                    Unknown
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                    <Button onClick={handleProfileSubmit} variant="contained" width='200'>
                                        Submit
                                    </Button>
                                </FormGroup>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <img src={image1} alt="" />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            
        </div>
    );
}
