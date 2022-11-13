import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/App.css';
import { Box, Card, CardContent, Typography, CardMedia, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import {useTheme } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Alert } from '@mui/material';
import axios from 'axios';

const handleStyle = { left: 10 };

function CustomNode({ data }) {
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
                  handleClickOpen();
              } else {
                  setAlert({show: true, content:res.data.message, severity: "error"});
                  handleClose();
              }
          })
          .catch(({ response }) => { 
              console.log(response.data.message);  
              setAlert({show: true, content:response.data.message, severity: "error"});
              handleClose();
          });
      }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
          {alertData.show? <Alert variant="outlined" onClose={() => {setAlert({show: false})}} severity={alertData.severity} >
                {alertData.content}
            </Alert> :
            <></>}
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
      <Handle type="target" position={Position.Top} />
      <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', paddingBottom: "1rem"}}>
        <CardContent sx={{display: 'flex', justifyItems: "center", alignItems: "center", flexDirection: "column"}}>
          <Typography component="div">
            {data.designation}
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
        image={data.image}
        alt="Director"
      />
      </Box>
      <Box sx={{position: "absolute", left: "50%", transform: "translate(-50%, -100%)",}}>
        <IconButton size="small" color="primary" aria-label="Add person below" onClick={handleClickOpen}>
          <AddCircleIcon />
        </IconButton>
      </Box>
    </Card>
    
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default CustomNode;
