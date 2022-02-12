import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import PersonAdd from "@mui/icons-material/PersonAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GridViewIcon from "@mui/icons-material/GridView";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Users from "../pages/Users";
import Dashboard from "../pages/Dashboard";
import Messages from "../pages/Messages";
import Products from "../pages/Products";
import Tooltip from "@mui/material/Tooltip";
import Order from "../pages/Orders";
import { useState } from "react";
import SignOut from "../signOut/SignOut";
import CategoryIcon from "@mui/icons-material/Category";
import Category from "../pages/Category";
import FadeMenu from "../profileMenu/FadeMenu";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const renderTabs = (currentComponent) => {
  switch (currentComponent) {
    case "user":
      return <Users />;
    case "product":
      return <Products />;
    case "category":
      return <Category />;
    case "message":
      return <Messages />;
    case "order":
      return <Order />;
    default:
      return <Dashboard />;
  }
};

function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentComponent, setComponent] = useState("dashboard");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ color: "black", backgroundColor: "#FFCA40" }}
      >
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Restaurant Management 
          </Typography>
          <Typography variant="h6" noWrap component="div">
            Restaurant Management 
          </Typography>
        </Toolbar>
        */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Restaurant Management
          </Typography>
          <FadeMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            key="dashboard"
            onClick={() => setComponent("dashboard")}
          >
            <ListItemIcon>
              <Tooltip title="Dashboard" placement="right" arrow>
                {<GridViewIcon />}
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <List>
          <ListItem
            button
            key="product"
            onClick={() => setComponent("product")}
          >
            <ListItemIcon>
              <Tooltip title="Product" placement="right" arrow>
                {<AddShoppingCartIcon />}
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
        </List>
        <List>
          <ListItem
            button
            key="category"
            onClick={() => setComponent("category")}
          >
            <ListItemIcon>
              <Tooltip title="Category" placement="right" arrow>
                {<CategoryIcon />}
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
        </List>
        <List>
          <ListItem button key="Orders" onClick={() => setComponent("order")}>
            <ListItemIcon>
              <Tooltip title="Orders" placement="right" arrow>
                {<LocalShippingIcon />}
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </List>
        <List>
          <ListItem button key="User" onClick={() => setComponent("user")}>
            <ListItemIcon>
              <Tooltip title="User" placement="right" arrow>
                {<PersonAdd />}
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
        </List>
        <List>
          <ListItem
            button
            key="Message"
            onClick={() => setComponent("message")}
          >
            <ListItemIcon>
              <Tooltip title="Message" placement="right" arrow>
                {<MailIcon />}
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Message" />
          </ListItem>
        </List>
        <SignOut />
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>{renderTabs(currentComponent)}</Typography>
      </Box>
    </Box>
  );
}
export default SideBar;
