import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/App.css';
import { Box, Card, CardContent, Typography, CardMedia, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import {useTheme } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

import { Alert, makeStyles } from '@mui/material';

import avatar from '../images/avatar.webp';

function CustomNode({ data }) {

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex'}}>
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
        style={{ width: 90 }}
        image={data.picture? data.picture: avatar}
        alt="Director"
      />
      </Box>
    </Card>
    
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default CustomNode;
