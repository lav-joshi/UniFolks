import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/App.css';
import { Box, Card, CardContent, Typography, IconButton, CardMedia } from '@material-ui/core';
import {useTheme } from "@material-ui/core/styles";

const handleStyle = { left: 10 };

function CustomNode({ data }) {
    const theme = useTheme();
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div">
            {data.designation}
          </Typography>
          <Typography style={{fontSize: "small"}} color="text.secondary" component="div">
            {data.name}
          </Typography>
          <Typography style={{fontSize: "small"}} color="text.secondary" component="a" to={`mailto:${data.email}`}>
            {data.email}
          </Typography>
        </CardContent>
        
      <CardMedia
        component="img"
        style={{ width: 90 }}
        image={data.image}
        alt="Director"
      />
      </Box>
    </Card>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default CustomNode;
