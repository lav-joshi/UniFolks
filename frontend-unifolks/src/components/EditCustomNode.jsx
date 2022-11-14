import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/App.css';
import { Box, Card, CardContent, Typography, CardMedia, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import {useTheme } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

import { Alert, makeStyles } from '@mui/material';
import axios from 'axios';
import avatar from '../images/avatar.webp';

function convertArraytoString(arr){
  let res = "";
  if(!arr) return res
  for(let i = 0 ; i < arr.length; i++){
      res+= arr[i];
      if(i!== arr.length - 1 )
        res += ",";
  }
  return res
}
function CustomNode({ data }) {
  // console.log(data);
    const theme = useTheme();
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  const [formValues, setFormValues] = useState({
    parentId: data.email,
    childId: ""
  });
  const inputChangeHandler = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
  };
  const [alertData, setAlert] = useState({show: false, content: "", severity: ""});
  const handleSubmit = () => {
    if (formValues.childId === "") {
        setAlert({show: true, content:"Please fill all the fields", severity: "error"});
    } else {
        axios
        .post("http://localhost:5000/api/admin/addleaf", formValues)
        .then((res) => {
            if (res.status === 200) {
                setAlert({show: true, content:res.data.message, severity: "success"});
                handleClose();
            } else {
                setAlert({show: true, content:res.data.message, severity: "error"});
                handleClose();
            }
        })
        .catch(({ response }) => { 
            setAlert({show: true, content:response.data.message, severity: "error"});
        });
    }
};

  // Edit Profile 
  const [profileAlert, setProfileAlert] = useState({
      show: false,
      content: "",
      severity: "",
  });
  console.log(data)
  const [profileFormValues, setProfileValues] = useState({
      name: data.name,
      designation: data.designation,
      bio: data.bio,
      email: data.email,
      contact: data.contact,  
      urls: convertArraytoString(data.urls),
      tags: convertArraytoString(data.tags),
  });
  console.log(profileFormValues);
  const inputProfileHandler = (event) => {
    const { name, value } = event.target;
    if(name === "urls"){
      let urls = value.split(',');
      if(urls && urls.length){
        for(let i = 0 ; i < urls.length ; i+=1){
          urls[i] = urls[i].trim()
        } 
        setProfileValues({...profileFormValues, [name] : urls})
      }
    }else if(name === "tags"){
      let tags = value.split(',');
      if(tags && tags.length){
      for(let i = 0 ; i < tags.length ; i+=1){
        tags[i] = tags[i].trim()
      }
      setProfileValues({...profileFormValues, [name] : tags})
    }
      console.log(profileFormValues)
    }else{
      setProfileValues({ ...profileFormValues, [name]: value });
    }
};
const handleProfileSubmit = () => {
      axios
          .post("http://localhost:5000/api/user/editProfile", profileFormValues)
          .then((res) => {
              if (res.status === 200) {
                  setProfileAlert({
                      show: true,
                      content: res.data.message,
                      severity: "success",
                  });
                  handleEditClose();
              } else {
                  setProfileAlert({
                      show: true,
                      content: res.data.message,
                      severity: "error",
                  });
                  handleEditClose();
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
      <Dialog open={alertData.show}>
        {alertData.show? <Alert autoFocus variant="outlined" onClose={() => {setAlert({show: false})}} severity={alertData.severity} >
            {alertData.content}
        </Alert> :
        <></>}
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new designation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the email of the person you want to add to the chart
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            name="childId"
            value={formValues.childId}
            onChange={(e) => inputChangeHandler(e)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Reports To"
            fullWidth
            variant="standard"
            disabled
            value={data.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
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
      <Dialog open={openEdit} onClose={handleEditClose}>
      <DialogTitle>Edit User Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit User Details</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
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

              
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleProfileSubmit}>Submit</Button>
                </DialogActions>
      </Dialog>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', paddingBottom: "1rem"}}>
        <CardContent sx={{display: 'flex', justifyItems: "center", alignItems: "center", flexDirection: "column"}}>
          <Typography component="div">
            {data.designation} 
            <IconButton onClick={handleEditOpen}>
              <EditIcon color="secondary" size="small"/>
            </IconButton>
          </Typography>
          <Typography style={{fontSize: "small"}} color="secondary" component="div">
            {data.name}
          </Typography>
          <Typography style={{fontSize: "small"}} color="secondary" component="a" to={`mailto:${data.email}`}>
            {data.email}
          </Typography>
          <br></br>
        </CardContent>
        
      <CardMedia
        component="img"
        style={{ width: 90, marginBottom: "-1rem" }}
        image={data.picture? data.picture: avatar}
        alt="Director"
      />
      </Box>
      <Box sx={{position: "absolute", left: "50%", transform: "translate(-50%, -100%)",}}>
        <Button color="primary" aria-label="Add person below" onClick={handleClickOpen}>
          <AddCircleIcon/>
        </Button>
      </Box>
    </Card>
    
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default CustomNode;
