import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/App.css';
import { Box, Card, CardContent, Typography, CardMedia, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, List, ListItem } from '@material-ui/core';


import { Alert, makeStyles } from '@mui/material';

import avatar from '../images/avatar.webp';

function FinanceComm({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ display: 'flex' }}>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Finance Committee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
              <ListItem>
              1.	Shri Amit Khare Secretary Higher Education MoE, Government of India
              </ListItem>
              <ListItem>
              2.	Shri Anil Kumar Director (Finance), MoE, Government of India.
              </ListItem>
              <ListItem>
              3.	Sh. Priyank Chaturvedi, Deputy Secretary (IIITs), Ministry of Education, Government of India or his representative
              </ListItem>
              <ListItem>
              4.	Shri Sunil Kumar Chaudhary One representative of the State Government in which the Institute is located, ex officio
              </ListItem>
              <ListItem>
              5.	Shri Rishirendra Kumar Managing Director U P Electronics Corporation Limited
              </ListItem>
              <ListItem>
              6.	Dr. Arun Mohan Sherry, Director, IIIT Lucknow.	Member
              </ListItem>
              <ListItem>
              7.	Dr. Vishal Krishna Singh Deputy Registrar IIIT Lucknow
              </ListItem>
            </List>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog> 
      <Button onClick={handleOpen}>
        Finance Committee
      </Button>
    </Card>
    
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default FinanceComm;
