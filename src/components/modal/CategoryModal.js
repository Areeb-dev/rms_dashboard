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
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import constant from "../../config/constant";
import axios from "axios";
import { Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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
export default function CategoryModal() {
  //modal data
  const [parentCategory, setParentCategory] = useState("");
  const [category, SetCategory] = useState("");
  const [parentcategoryData, setParentCategoryData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorStatus, setErrorStatu] = useState("");
  const [issuccess, setIsSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let baseUrl = constant.baseUrl;
  let getAuthToken = localStorage.getItem("AuthToken");

  const submitFormData = (e) => {
    e.preventDefault();
    setSpinner(true);
    let payload = {
      parentCategory: parentCategory,
      name: category,
    };
    axios
      .post(`${baseUrl}/category`, payload, {
        headers: {
          x_auth_token: getAuthToken,
        },
      })
      .then((response) => {
        setSpinner(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setSpinner(false);
        let errorMsg = error.response.data.message;
        let errorSt = error.response.data.status;
        setErrorStatu(errorSt);
        setErrorCode(errorMsg);
        setIsError(true);
      });
  };

  const cancel = () => {
    setParentCategory("''");
    SetCategory("");
    handleClose(true);
  };
  const handleError = () => {
    if (errorStatus == 400) {
      return errorCode;
    }
  };
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
  return (
    <div>
      <Fab
        onClick={handleOpen}
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
              Create Category
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Parent Category
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parentCategory}
                label="Parent Category"
                onChange={(e) => {
                  setParentCategory(e.target.value);
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
                label="Category"
                variant="outlined"
                value={category}
                placeholder="Category"
                onChange={(e) => {
                  SetCategory(e.target.value);
                }}
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
                  Category Create Successfully.
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
