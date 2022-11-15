import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./styles/MyGlass.modules.css";
import MyGlass from "./components/MyGlass";
import ChatGround from "./ChatGround";

import {
    Drawer,
    List,
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    Box,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import WorkIcon from "@material-ui/icons/Work";

import { Route, Switch, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import OrgChart from "./components/OrgChart";
import EditOrgChart from "./components/EditOrgChart";
import EditProfile from "./components/EditProfile";
import Search from "./components/Search";
import logo from './images/ashu-landoori 3.png'
const cookies = new Cookies();

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        overflowX: "hidden",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    deco: {
        textDecoration: "none",
        color: theme.palette.primary.dark,
        // margin: "10px"
    },
    sidebar: {
        overflowX: "hidden",
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const { loggedin, setloggedin } = { loggedin: true, setloggedin: () => {} };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const clicked = (e) => {
        console.log(e.target);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className="sidebar-top">
                    <Grid container>
                        <Grid item xs={6} md={5}>
                            <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="center "
                            >
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, {
                                        [classes.hide]: open,
                                    })}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Switch>
                                    <Route exact path="/dashboard">
                                        <Typography variant="h6" noWrap>
                                            Dashboard
                                        </Typography>
                                    </Route>
                                    <Route path="/dashboard/editorganization">
                                        <Typography variant="h6" noWrap>
                                            Edit Organization Chart
                                        </Typography>
                                    </Route>
                                    <Route path="/dashboard/editProfile">
                                        <Typography variant="h6" noWrap>
                                            Edit Profile
                                        </Typography>
                                    </Route>
                                    <Route path="/dashboard/chat">
                                        <Typography variant="h6" noWrap>
                                            Chat Ground
                                        </Typography>
                                    </Route>
                                    <Route path="/dashboard/search">
                                        <Typography variant="h6" noWrap>
                                            Search all users
                                        </Typography>
                                    </Route>
                                </Switch>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={`${clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })} ${classes.sidebar}`}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <Box
                    boxShadow={2}
                    className="sidebar-left-title"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height={64}
                    py={4}
                >
                    <Grid container>
                        <Grid item xs={9}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height={50}
                            >
                                <Typography align="center" className="sidebar-title">
                                    <img src={logo} alt="UniFolks" style={{width: "50px", background: 'white', borderRadius: "1rem"}}/> UniFolks
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton onClick={handleDrawerClose} className="sidebar-icon-left">
                                {theme.direction === "rtl" ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box bgcolor="sidebar-divider">
                    <Divider className="sidebar-divider" />
                </Box>
                <List className="sidebar-content">
                    <Link
                        to="/dashboard"
                        className={`${classes.toolbar} sidebar-li`}
                        onClick={clicked}
                    >
                        <ListItem
                            button
                            data-list-type="dash"
                            key={"Dashboard"}
                            onClick={clicked}
                        >
                            <ListItemIcon
                                className="sidebar-li"
                                data-list-type="dash"
                            >
                                <DashboardIcon
                                    className="sidebar-icon"
                                    data-list-type="dash"
                                />
                            </ListItemIcon>
                            <ListItemText
                                className="sidebar-li"
                                data-list-type="dash"
                                color="primary"
                                primary={"Organization Chart"}
                            />
                        </ListItem>
                    </Link>
                    <Link
                        to="/dashboard/editOrganization"
                        className={`${classes.toolbar} sidebar-li`}
                    >
                        <ListItem
                            button
                            data-list-type="eoc"
                            className="li-3"
                            key={"Edit Organization Chart"}
                        >
                            <ListItemIcon className="li-3" data-list-type="eoc">
                                <AccountBoxIcon data-list-type="eoc" className="sidebar-icon"/>
                            </ListItemIcon>
                            <ListItemText
                                data-list-type="eoc"
                                primary={"Edit Organization Chart"}
                            />
                        </ListItem>
                    </Link>
                    <Link
                        to="/dashboard/editProfile"
                        className={`${classes.toolbar} sidebar-li`}
                        
                    >
                        <ListItem
                            button
                            data-list-type="editProfile"
                            className="li-3"
                            key={"Edit Profile"}
                        >
                            <ListItemIcon
                                className="li-3"
                                data-list-type="editprofile"
                            >
                                <WorkIcon data-list-type="editprofile" className="sidebar-icon"/>
                            </ListItemIcon>
                            <ListItemText primary={"Edit Profile"} />
                        </ListItem>
                    </Link>
                    <Link
                        to="/dashboard/chat"
                        className={`${classes.toolbar} sidebar-li`}
                        
                    >
                        <ListItem
                            button
                            data-list-type="chat"
                            className="li-3"
                            key={"Chat"}
                        >
                            <ListItemIcon
                                className="li-3"
                                data-list-type="chat"
                            >
                                <AccountBoxIcon data-list-type="chat" className="sidebar-icon"/>
                            </ListItemIcon>
                            <ListItemText
                                data-list-type="chat"
                                primary={"Chat"}
                            />
                        </ListItem>
                    </Link>
                    <Link
                        to="/dashboard/search"
                        className={`${classes.toolbar} sidebar-li`}
                        
                    >
                        <ListItem
                            button
                            data-list-type="search"
                            className="li-3"
                            key={"Search"}
                        >
                            <ListItemIcon
                                className="li-3"
                                data-list-type="search"
                            >
                                <AccountBoxIcon data-list-type="search" className="sidebar-icon"/>
                            </ListItemIcon>
                            <ListItemText
                                data-list-type="search"
                                primary={"Search"}
                            />
                        </ListItem>
                    </Link>

                    <Link
                        to="/dashboard/eduon"
                        className={`${classes.toolbar} sidebar-li`}
                        
                    >
                        <ListItem
                            button
                            data-list-type="eduon"
                            className="li-3"
                            key={"EduOn"}
                        >
                            <ListItemIcon
                                data-list-type="eduon"
                            >
                                <AccountBoxIcon data-list-type="eduon" className="sidebar-icon"/>
                            </ListItemIcon>
                            <ListItemText
                                data-list-type="eduon"
                                primary={"Eduon"}
                            />
                        </ListItem>
                    </Link>
                </List>
                <MyGlass></MyGlass>
            </Drawer>
            <main className={`${classes.content}  contentBg-3`}>
                <div className={`${classes.toolbar}`} />
                <Switch>
                    <Route exact path="/dashboard" component={OrgChart} />
                    <Route
                        exact
                        path="/dashboard/editOrganization"
                        component={EditOrgChart}
                    />
                    <Route
                        exact
                        path="/dashboard/editProfile"
                        component={EditProfile}
                    />
                    <Route
                        exact
                        path="/dashboard/chat"
                        component={ChatGround}
                    />
                    <Route exact path="/dashboard/search" component={Search} />
                    <Route
                        path="/dashboard/eduon"
                        component={() => {
                            window.location.href = "http://localhost:4000";
                            return null;
                        }}
                    />
                </Switch>
            </main>
        </div>
    );
}
