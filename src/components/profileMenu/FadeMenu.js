import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ProfileMenu from "./ProfileMenu";
import SignOut from "../signOut/SignOut";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { Avatar, Box, Divider, Typography } from "@mui/material";

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
  const dashboardPage = () => {
    navigate("/dashboard", { replace: true });
  };
  const UserEmail=localStorage.getItem('UserEmail')
  return (
    <div>
      <IconButton
        type="submit"
        sx={{
          p: 0,
          color: "black",
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* <ProfileMenu /> */}
        <Avatar src='/static/images/avatar/1.jpg' alt="photoURL" />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          width: 559,
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {"UserName"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {UserEmail}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={dashboardPage}>Dashboard</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("AuthToken");
            localStorage.removeItem("UserEmail");
            navigate("/", { replace: true });
          }}
        >
          {/* <LogoutIcon /> */}
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}
