import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { getSmoothStepPath } from "reactflow";

const foreignObjectSize = 40;

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    ...data
}) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const [formValues, setFormValues] = useState({
        parentId: data.source,
        childId: data.target,
        newChildId: ""
    });
    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [alertData, setAlert] = useState({
        show: false,
        content: "",
        severity: "",
    });
    const handleSubmit = () => {
        if (formValues.email === "") {
            setAlert({
                show: true,
                content: "Please fill all the fields",
                severity: "error",
            });
        } else {
            axios.post(`${process.env.REACT_APP_HOST}/api/admin/addbetween`, formValues)
                .then((res) => {
                if (res.status === 200) {
                    setAlert({
                        show: true,
                        content: res.data.message,
                        severity: "success",
                    });
                    handleClose();
                } else {
                    setAlert({
                        show: true,
                        content: res.data.message,
                        severity: "error",
                    });
                    handleClose();
                }
                })
                .catch(({ response }) => {
                    setAlert({
                        show: true,
                        content: response.data.message,
                        severity: "error",
                    });
                })
        }
    };
    return (
        <>
            <Dialog open={alertData.show}>
                {alertData.show ? (
                    <Alert
                        autoFocus
                        variant="outlined"
                        onClose={() => {
                            setAlert({ show: false });
                        }}
                        severity={alertData.severity}
                    >
                        {alertData.content}
                    </Alert>
                ) : (
                    <></>
                )}
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new designation  </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new designation between {data.source} and {data.target}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        name="newChildId"
                        value={formValues.newChildId}
                        onChange={(e) => inputChangeHandler(e)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Reports To"
                        fullWidth
                        variant="standard"
                        value={formValues.parentId}
                        disabled
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
            >
                <body>
                    <button className="edgebutton" onClick={handleOpen}>
                        +
                    </button>
                </body>
            </foreignObject>
        </>
    );
}
