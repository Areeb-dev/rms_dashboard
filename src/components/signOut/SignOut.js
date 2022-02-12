import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  let navigate = useNavigate();
  
  return (
    <List>
      <ListItem
        button
        key="logOut"
        onClick={() => {
          localStorage.removeItem("AuthToken");
          navigate("/", { replace: true });
        }}
      >
        <ListItemIcon>
          <Tooltip title="LogOut" placement="right" arrow>
            {<LogoutIcon />}
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="LogOut" />
      </ListItem>
    </List>
  );
};
export default SignOut;
