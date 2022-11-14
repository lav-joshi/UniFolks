import { useCallback } from "react";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ConnectionLineType,
} from "reactflow";
import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import dagre from "dagre";

const position = { x: 0, y: 0 };
const initialNodes = [
    {
        id: "1",
        position,
        type: "customNode",
        data: {
            image: 'https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/Dr. Arun Mohan Sherry.png',
            name: "Dr. Arun Mohan Sherry",
            designation: "Director",
            email: "director@iiitl.ac.in",
        },
    },
    {
        id: "2",
        position,
        type: "customNode",
        data: {
            image: "https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/DR.%20DHANANJOY%20DEY.png",
            name: "Dr. Dhananjoy Dey",
            designation: "Dean",
            email: "director@iiitl.ac.in",
        },
    },
    {
        id: "3",
        type: "customNode",
        position,
        data: {
            image: "https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/Dr. Vishal Krishna Singh.png",
            name: "Dr. Vishal Krishna Singh",
            designation: "Deputy Registrar",
            email: "director@iiitl.ac.in",
        },
    },
    {
      id: "4",
      type: "customNode",
      position,
      data: {
          image: "https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/Dr. Mainak Adhikari.png",
          name: "Dr. Mainak Adhikari",
          designation: "HOD CS",
          email: "director@iiitl.ac.in",
      },
  },
  {
        id: "5",
        type: "customNode",
        position,
        data: {
            image: "https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/Dr. Deepshikha Agarwal.png",
            name: "Dr. Deepshikha Agarwal",
            designation: "HOD IT",
            email: "director@iiitl.ac.in",
        },
    },
    {
      id: "6",
      type: "customNode",
      position,
      data: {
          image: "https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/Dr. Deepshikha Agarwal.png",
          name: "Dr. Deepshikha Agarwal",
          designation: "One more aise hi",
          email: "director@iiitl.ac.in",
      },
    },
    {
      id: "7",
      type: "customNode",
      position,
      data: {
          image: "https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/Dr. Deepshikha Agarwal.png",
          name: "Dr. Deepshikha Agarwal",
          designation: "One more aise hi",
          email: "director@iiitl.ac.in",
      }
    },
    {
      id: "8",
      type: "customNode",
      position,
      data: {
          image: "https://raw.githubusercontent.com/harshitg00/college-peeps/main/Faculty/Dr. Deepshikha Agarwal.png",
          name: "Dr. Deepshikha Agarwal",
          designation: "One more aise hi",
          email: "director@iiitl.ac.in",
      }
    }
];
const nodeTypes = { customNode: CustomNode };
const initialEdges = [
    { id: "e1-2", source: "1", target: "2", type: "smoothstep", style: { stroke: 'red' }},
    { id: "e1-3", source: "1", target: "3" , type: "step", style: { stroke: 'red' }},
    { id: "e2-4", source: "2", target: "4" , type: "step", style: { stroke: 'red' }},
    { id: "e2-5", source: "2", target: "5" , type: "step", style: { stroke: 'red' }},
    { id: "e2-6", source: "2", target: "6" , type: "step", style: { stroke: 'red' }},
    { id: "e3-7", source: "3", target: "7" , type: "step", style: { stroke: 'red' }},
    { id: "e3-8", source: "3", target: "8" , type: "step", style: { stroke: 'red' }},
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 130;

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

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
);

export default function OrgChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

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

    return (
        <div style={{ height: "80vh", width: "100%" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}
