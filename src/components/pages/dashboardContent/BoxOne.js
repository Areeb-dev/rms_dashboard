import FilterListIcon from "@mui/icons-material/FilterList";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import "./box.css";
import { styled } from "@mui/material/styles";
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const BoxOne = () => {
  return (
    <>
      <FilterListIcon
        style={{
          marginLeft: "90%",
          marginTop: "0",
          color: "#000",
          fontSize: 30,
        }}
      />
      <Div>
        <Typography variant="body2" gutterBottom>
          Hello World
          <br />
          Hello world
        </Typography>
      </Div>
     
    </>
  );
};
export default BoxOne;
