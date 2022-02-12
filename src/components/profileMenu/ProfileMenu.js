import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Toolbar from "@mui/material/Toolbar";

function ProfileMenu(props) {
  const { onDrawerToggle } = props;

  return (
    <>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />
          <Grid item>
            <IconButton color="inherit" sx={{ p: 0.5, mt: -1 }}>
              <AccountCircle />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
}

ProfileMenu.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default ProfileMenu;
