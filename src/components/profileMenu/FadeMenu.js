import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ProfileMenu from "./ProfileMenu";
import SignOut from "../signOut/SignOut";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
      sx={{color:'black'}}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ProfileMenu  />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={() => {
          localStorage.removeItem("AuthToken");
          navigate("/", { replace: true });
        }}><LogoutIcon />Log Out</MenuItem>
        
      </Menu>
    </div>
  );
}
