import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ConnectionLineType,
} from "reactflow";
import CustomNode from "./EditCustomNode.jsx";
import BOGButton from "./BOGButton.jsx";
import ButtonEdge from './CustomEdge.jsx';
import FinanceComm from "./FinanceButton.jsx";
import "reactflow/dist/style.css";
import dagre from "dagre";
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

const position = { x: 0, y: 0 };
const nodeTypes = { customNode: CustomNode, bogButton: BOGButton, financeComm: FinanceComm };
const edgeTypes = {buttonedge: ButtonEdge };
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 160;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? "left" : "top";
        node.sourcePosition = isHorizontal ? "right" : "bottom";

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};

export default function EditOrgChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const getTree = () => {
        axios
        .get(`${process.env.REACT_APP_HOST}/api/user/getTree`)
        .then((res) => {
            console.log(res.data);
            const { nodes, edges } = getLayoutedElements(
                res.data.initialNodes,
                res.data.initialEdges
            );
            setNodes(nodes);
            setEdges(edges);
            console.log(nodes);
        })
        .catch(({ response }) => {
            console.log(response.data.message);
        });
    }
    useEffect(() => {
        getTree();
    }, []);
    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        type: ConnectionLineType.SmoothStep,
                        animated: true,
                    },
                    eds
                )
            ),
        []
    );
    const onLayout = useCallback(
        (direction) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } =
                getLayoutedElements(nodes, edges, direction);
    
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );
    const [openModal, setOpenModal] = useState(false);
    const handleModalOpen = (e) => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };
    
    const [alertData, setAlert] = useState({show: false, content: "", severity: ""});
    const [formValues, setFormValues] = useState({
        name: "",
        designation: "",
        email: "",
    });
    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = () => {
        if (
            formValues.name === "" ||
            formValues.designation === "" ||
            formValues.email === ""
        ) {
            setAlert({show: true, content:"Please fill all the fields", severity: "error"});
        } else {
            axios
                .post(`${process.env.REACT_APP_HOST}/api/admin/create`, formValues)
                .then((res) => {
                    if (res.status === 200) {
                        setAlert({show: true, content:res.data.message, severity: "success"});
                        setOpenModal(false);
                    } else {
                        setAlert({show: true, content:res.data.message, severity: "error"});
                        setOpenModal(false);
                    }
                })
                .catch(({ response }) => { 
                    console.log(response.data.message);  
                    setAlert({show: true, content:response.data.message, severity: "error"});
                    setOpenModal(false);
                });
        }
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div style={{ height: "80vh", width: "100%" }}>
            <Dialog open={alertData.show}>
                {alertData.show? <Alert variant="outlined" onClose={() => {setAlert({show: false})}} severity={alertData.severity} >
                    {alertData.content}
                </Alert> :
            <></>}
            </Dialog>
            <Dialog open={openModal} onClose={handleModalClose}>
                <DialogTitle>Add a new designation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Create a new User</DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter Name"
                        fullWidth
                        variant="standard"
                        name="name"
                        value={formValues.name}
                        onChange={(e) => inputChangeHandler(e)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Designation"
                        fullWidth
                        variant="standard"
                        name="designation"
                        onChange={(e) => inputChangeHandler(e)}
                    />
                    
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        name="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => inputChangeHandler(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                onClick={handleModalOpen}
                className="react-flow__button"
                sx={{ position: "absolute", top: "10px" }}
            >
                Add User
            </Button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                sx={{ marginTop: "-4rem" }}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}
