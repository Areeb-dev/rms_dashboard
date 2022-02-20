import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../../../config/constant";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loading from "../../loader/Loader";
import {
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import DeleteProductModal from "../../modal/DeleteProductModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ProductCard() {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [categoryForFilter, setCategoryForFilter] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  let baseUrl = constant.baseUrl;
  let getAuthToken = localStorage.getItem("AuthToken");
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${baseUrl}/product`, {
        headers: {
          x_auth_token: getAuthToken,
        },
      })
      .then((response) => {
        setProductData(response.data.data.slice(0, 50));
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
    //for set filter comp
    axios
      .get(`${baseUrl}/category`, {
        headers: {
          x_auth_token: getAuthToken,
        },
      })
      .then((response) => {
        setCategoryForFilter(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //for delete or edit menu function
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editProduct = () => {};
  //delete product modal function

  const deleteProduct = () => {
    <DeleteProductModal />;
    console.log("hell delete function");
  };
  console.log(filterCategory)
  return (
    <>
      {loader ? <Loading /> : ""}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Card
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              height: 60,
              boxShadow: "0px 10px 225px 10px #836b6b",
              backgroundColor: "red",
              textAlign: "center",
              borderRadius: "12px",
            }}
          >
            <CardHeader title={`Total Products: 652`} />
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={7}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 10px 225px 10px #836b6b",
              borderRadius: "12px",
            }}
          >
            <TextField
              // fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              sx={{ width: 650 }}
              placeholder="Search product"
              variant="outlined"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category Filter</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterCategory}
                label="Parent Category"
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                }}
              >
                {categoryForFilter.map((categoryFilter, index) => {
                  return (
                    <MenuItem key={index} value={categoryFilter._id}>
                      {categoryFilter.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {productData
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((prodata, index) => {
            let { name, description, price, imageUrl } = prodata;
            return (
              <Grid item key={index} xs={12} md={4} lg={4}>
                <Card
                  key={index}
                  sx={{
                    boxShadow: "-12px 12px 36px #836b6b",
                    borderRadius: " 22px",
                    maxWidth: 345,
                    marginTop: "25px",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        alt={name}
                        src={imageUrl}
                      ></Avatar>
                    }
                    action={
                      <>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          sx={{ color: "red" }}
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              width: "10ch",
                            },
                          }}
                        >
                          <MenuItem key="editProduct" onClick={editProduct}>
                            <Button
                              sx={{
                                color: "black",
                                "&.MuiButtonBase-root:hover": {
                                  bgcolor: "transparent",
                                },
                              }}
                              variant="text"
                            >
                              Edit
                            </Button>
                          </MenuItem>
                          <MenuItem key="deleteProduct" onClick={deleteProduct}>
                            <Button
                              sx={{
                                color: "black",
                                "&.MuiButtonBase-root:hover": {
                                  bgcolor: "transparent",
                                },
                              }}
                              variant="text"
                            >
                              Delete
                            </Button>
                          </MenuItem>
                        </Menu>
                      </>
                    }
                    title={
                      <Typography gutterBottom variant="h6" component="h6">
                        {`${name}`}
                      </Typography>
                    }
                    subheader={`Price: ${price}`}
                  />
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
