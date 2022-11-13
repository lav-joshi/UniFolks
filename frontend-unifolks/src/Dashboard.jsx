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
    Button,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
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
const cookies = new Cookies();

const drawerWidth = 250;

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
    potentiaDiv: {
        backgroundColor: theme.palette.secondary.light,
    },
    sidebarContent: {
        backgroundColor: theme.palette.secondary.light,
        height: "100vh",
        overflowX: "hidden",
        boxShadow: "4px 4px 2px #000",
        maxWidth: 250,
    },
    divi: {
        backgroundColor: theme.palette.primary.light,
        // height: 2
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
                <Toolbar>
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
                                    <Route exact path="/">
                                        <Typography variant="h6" noWrap>
                                            Dashboard
                                        </Typography>
                                    </Route>
                                    <Route exact path="/ccpanel">
                                        <Typography variant="h6" noWrap>
                                            Client Control Panel
                                        </Typography>
                                    </Route>
                                    <Route exact path="/business">
                                        <Typography variant="h6" noWrap>
                                            Business Control Panel
                                        </Typography>
                                    </Route>
                                </Switch>
                            </Box>
                        </Grid>
                        <Grid
                            style={{ alignSelf: "center" }}
                            item
                            xs={6}
                            md={7}
                        >
                            {loggedin ? (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                >
                                    <Box mr={2}>Welcome User!</Box>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => {
                                            cookies.remove("login");
                                            setloggedin(false);
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </Box>
                            ) : (
                                <></>
                            )}
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
                    className={`${classes.potentiaDiv}`}
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
                                <Typography variant="h4" align="center">
                                    UniFolks
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "rtl" ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box bgcolor="secondary.light">
                    <Divider className={`${classes.divi}`} light={true} />
                </Box>
                <List className={classes.sidebarContent}>
                    <Link
                        to="/dashboard"
                        className={`li-1 ${classes.toolbar} ${classes.deco}`}
                        onClick={clicked}
                    >
                        <ListItem
                            button
                            data-list-type="dash"
                            key={"Dashboard"}
                            className={`li-1 ${classes.activeDeco}`}
                            onClick={clicked}
                        >
                            <ListItemIcon
                                className={`li-1 ${classes.activeDeco}`}
                                data-list-type="dash"
                            >
                                <DashboardIcon
                                    className="li-1"
                                    data-list-type="dash"
                                />
                            </ListItemIcon>
                            <ListItemText
                                className="li-1"
                                data-list-type="dash"
                                color="primary"
                                primary={"Organization Chart"}
                            />
                        </ListItem>
                    </Link>
                    <Link
                        to="/dashboard/editOrganization"
                        className={`${classes.toolbar} ${classes.deco}`}
                    >
                        <ListItem
                            button
                            data-list-type="eoc"
                            className="li-3"
                            key={"Edit Organization Chart"}
                        >
                            <ListItemIcon className="li-3" data-list-type="eoc">
                                <AccountBoxIcon data-list-type="eoc" />
                            </ListItemIcon>
                            <ListItemText
                                data-list-type="eoc"
                                primary={"Edit Organization Chart"}
                            />
                        </ListItem>
                    </Link>
                    <Link
                        to="/dashboard/editProfile"
                        className={`${classes.toolbar} ${classes.deco}`}
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
                                <WorkIcon data-list-type="editprofile" />
                            </ListItemIcon>
                            <ListItemText primary={"Edit Profile"} />
                        </ListItem>
                    </Link>
                    <Link
                        to="/dashboard/chat"
                        className={`${classes.toolbar} ${classes.deco}`}
                    >
                        <ListItem
                            button
                            data-list-type="eoc"
                            className="li-3"
                            key={"Chat"}
                        >
                            <ListItemIcon className="li-3" data-list-type="eoc">
                                <AccountBoxIcon data-list-type="eoc" />
                            </ListItemIcon>
                            <ListItemText
                                data-list-type="eoc"
                                primary={"Chat"}
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
                    <Route exact path="/dashboard/editOrganization" component={EditOrgChart} />
                    <Route exact path="/dashboard/editProfile" component={EditProfile} />
                    <Route exact path="/dashboard/chat" component={ChatGround} />
                </Switch>
            </main>
        </div>
    );
}
