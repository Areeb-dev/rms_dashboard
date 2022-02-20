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
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import constant from "../../config/constant";
import { Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Fab from "@mui/material/Fab";

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
  const [imageData, setImageData] = useState("");
  const [parentcategoryData, setParentCategoryData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorStatus, setErrorStatu] = useState("");
  const [issuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let baseUrl = constant.baseUrl;
  let getAuthToken = localStorage.getItem("AuthToken");
  useEffect(() => {
    axios
      .get(`${baseUrl}/category`, {
        headers: {
          x_auth_token: getAuthToken,
        },
      })
      .then((response) => {
        setParentCategoryData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleImageChange = (event) => {
    setImageData(event.target.files[0]);
  };
  const submitFormData = (e) => {
    e.preventDefault();
    setSpinner(true);
    let payload = new FormData();
    payload.append("name", productName);
    payload.append("categoryId", category);
    payload.append("description", productDescription);
    payload.append("price", price);
    payload.append("image", imageData);
    axios
      .post(`${baseUrl}/product`, payload, {
        headers: {
          x_auth_token: getAuthToken,
        },
      })
      .then((response) => {
        setSpinner(false);
        setIsSuccess(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
        let errorMsg = error.response.data.message;
        let errorSt = error.response.data.status;
        setErrorStatu(errorSt);
        setErrorCode(errorMsg);
        setIsError(true);
      });
  };
  const handleError = () => {
    if (errorStatus == 400) {
      return errorCode;
    }
  };
  // modal function
  const cancel = () => {
    SetCategory("");
    SetProductName("");
    SetProductDescription("");
    SetPrice("");
    handleClose(true);
  };

  return (
    <div>
      <Fab
        onClick={handleOpen}
        variant="circular"
        color="primary"
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(10),
          right: (theme) => theme.spacing(5),
        }}
      >
        <SpeedDialIcon />
      </Fab>
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
                {parentcategoryData.map((parentcat, index) => {
                  return (
                    <MenuItem key={index} value={parentcat._id}>
                      {parentcat.name}
                    </MenuItem>
                  );
                })}
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

                {spinner ? (
                  <LoadingButton
                    type="submit"
                    loading
                    loadingPosition="start"
                    startIcon="Sign In"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </LoadingButton>
                ) : (
                  <Button
                    endIcon={<SaveAsRoundedIcon />}
                    onClick={submitFormData}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                )}
              </Stack>
              <RedBar />
              {isError ? (
                <Alert
                  variant="outlined"
                  sx={{ color: "black", align: "center" }}
                  severity="error"
                >
                  {handleError()}
                </Alert>
              ) : (
                ""
              )}
              {issuccess ? (
                <Alert severity="success" color="success">
                  Product Create Successfully
                </Alert>
              ) : (
                ""
              )}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
