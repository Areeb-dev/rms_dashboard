import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "1px solid white",
  boxShadow: 2,
  p: 4,
  borderRadius: "10px",
};
function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: "white",
      }}
    />
  );
}
export default function ProductModal() {
  //modal data
  const [category, SetCategory] = useState("");
  const [productName, SetProductName] = useState("");
  const [productDescription, SetProductDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [imageData, setImageData] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitFormData = (e) => {
    e.preventDefault();
    let payload = new FormData();
    payload.append("category", category);
    payload.append("productName", productName);
    payload.append("productDescription", productDescription);
    payload.append("price", price);
    payload.append("image", imageData);

    console.log(payload.get("price"));
    SetCategory("");
    SetProductName("");
    SetProductDescription("");
    SetPrice("");
  };
  // modal function
  const cancel = () => {
    SetCategory("");
    SetProductName("");
    SetProductDescription("");
    SetPrice("");
    handleClose(true);
  };
  const handleImageChange = (event) => {
    setImageData(event.target.files[0]);
  };
  return (
    <div>
      <Box sx={{ height: 490, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          onClick={handleOpen}
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        ></SpeedDial>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create Items/Products
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                fullWidth
                id="outlined-basic margin-none"
                label="Category"
                variant="outlined"
                placeholder="Category"
                value={category}
                onChange={(e) => {
                  SetCategory(e.target.value);
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <RedBar />
              <TextField
                fullWidth
                id="outlined-basic margin-none"
                label="Product Name"
                placeholder="Product Name"
                variant="outlined"
                value={productName}
                onChange={(e) => {
                  SetProductName(e.target.value);
                }}
              />
              <RedBar />
              <TextField
                fullWidth
                id="outlined-textarea margin-none"
                label="Product Description"
                placeholder="Product Description"
                value={productDescription}
                multiline
                onChange={(e) => {
                  SetProductDescription(e.target.value);
                }}
              />
              <RedBar />

              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                fullWidth
                type="number"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">PKR</InputAdornment>
                }
                value={price}
                label="Price"
                onChange={(e) => {
                  SetPrice(e.target.value);
                }}
              />
              <RedBar />

              <input
                type="file"
                onClick={(event) => {
                  event.target.value = null;
                }}
                onChange={(e) => handleImageChange(e)}
              />

              <RedBar />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={cancel}
                >
                  Clear
                </Button>
                <Button
                  onClick={submitFormData}
                  variant="contained"
                  endIcon={<SaveAsRoundedIcon />}
                >
                  Save
                </Button>
              </Stack>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
