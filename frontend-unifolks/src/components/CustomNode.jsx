import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/App.css';
import { Box, Card, CardContent, Typography, CardMedia, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import {useTheme } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const handleStyle = { left: 10 };

function CustomNode({ data }) {
    const theme = useTheme();
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
    console.log(e.target);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new designation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter details of the designation
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Designation Name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
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
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', paddingBottom: "1rem"}}>
        <CardContent sx={{display: 'flex', justifyItems: "center", alignItems: "center", flexDirection: "column"}}>
          <Typography component="div">
            {data.designation}
          </Typography>
          <Typography style={{fontSize: "small"}} color="text.secondary" component="div">
            {data.name}
          </Typography>
          <Typography style={{fontSize: "small"}} color="text.secondary" component="a" to={`mailto:${data.email}`}>
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
