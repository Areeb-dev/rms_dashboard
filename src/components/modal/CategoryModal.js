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
  borderRadius: "10px"
};
function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: "white"
      }}
    />
  );
}
export default function CategoryModal() {
  //modal data
  const [parentcategory, setParentCategory] = useState("");
  const [category, SetCategory] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitFormData = (e) => {
    e.preventDefault();
    console.log(`category : ${category} parentcategory :${parentcategory}`);
  };
  const cancel = () => {
    handleClose(true);
  };

  return (
    <div>
      <Box sx={{ height: 490, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          onClick={handleOpen}
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16
          }}
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
          timeout: 500
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
                value={parentcategory}
                label="Parent Category"
                onChange={(e) => {
                  setParentCategory(e.target.value);
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
                label="Category"
                variant="outlined"
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
