import FilterListIcon from "@mui/icons-material/FilterList";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import "./box.css";

const BoxOne = () => {
  return (
    <>
      <FilterListIcon
        style={{
          marginLeft: "90%",
          marginTop: "0",
          color: "#000",
          fontSize: 30
        }}
      />
      <List class="box1">
        <ListItem>
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <div>
            <ListItemText primary="TOTAL ORDERS" />
          </div>
        </ListItem>
      </List>
      <h4>21,735</h4>
    </>
  );
};
export default BoxOne;
