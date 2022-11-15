import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/App.css';
import { Box, Card, CardContent, Typography, CardMedia, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, List, ListItem } from '@material-ui/core';


import { Alert, makeStyles } from '@mui/material';

import avatar from '../images/avatar.webp';

function BOGButton({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ display: 'flex' }}>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Board of Governers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List>
              <ListItem>
              1.	Shri K Sanjay Murthy, IAS, Secretary (HE), Ministry of Education, Govt. of India	Chairperson
              </ListItem>
              <ListItem>
              2.	Shri Rakesh Ranjan, IAS, Addl. Secretary (TE), Ministry of Education, Govt. of India	Member
              </ListItem>
              <ListItem>
              3.	Shri Sunil Kumar Chaudhary, IAS, Special Secretary, Technical Education, U.P. Govt.	Member
              </ListItem>
              <ListItem>
              4.	Dr. Ujjawal Kumar, lAS, M.D., U.P. Electronics Corporation Ltd.	Member
              </ListItem>
              <ListItem>
              5.	Prof. Abhay Karandikar, Director, llT Kanpur	Member
              </ListItem>
              <ListItem>
              6.	Dr. Arun Mohan Sherry, Director, IIIT Lucknow.	Member
              </ListItem>
              <ListItem>
              7.	Prof. R K Sharma, ConsenSys Blockchain Chair Professor, llT Delhi	Member
              </ListItem>
              <ListItem>
              8.	Prof. U C Gupta, Prof. & Former Head, Department of Mathematics, llT Kharagpur	Member
              </ListItem>
              <ListItem>
              9.	Dr. Rajul Ranjan Choudhury, Scientific Officer (G), Bhabha Atomic Research Centre, Trombay, Mumbai	Member
              </ListItem>
              <ListItem>
              10.	Dr. Amarendra Sahoo,(Masters-Duke University; PhD-IIT Bombay), Former Chairman, Atom Technologies lndia Limited, Mumbai	Member
              </ListItem>
              <ListItem>
              11.	Dr. Ravi Kumar, PhD (University of Leeds, UK), M M P.G College, Modinagar U.P	Member
              </ListItem>
              <ListItem>
              12.	Mrs. Rachna Mathur (Social Worker), Lucknow	Member
              </ListItem>
              <ListItem>
              13.	Dr. Dhananjoy Dey, Assoc. Professor, lllT Lucknow	Member
              </ListItem>
              <ListItem>
              14.	Dr. Vinod Kumar, Asst. Professor, lllT Lucknow	Member
              </ListItem>
            </List>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog> 
      <Button onClick={handleOpen}>
        Board Of Governers
      </Button>
    </Card>
    
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default BOGButton;
