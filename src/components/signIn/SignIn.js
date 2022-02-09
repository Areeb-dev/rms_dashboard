import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import constant from "../../config/constant";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert } from "@mui/material";

const theme = createTheme();
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorStatus, setErrorStatu] = useState("");

  let navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const payload = {
      email: email,
      password: password,
      platform: "dashboard",
    };

    let baseUrl = constant.baseUrl;

    axios
      .post(`${baseUrl}/auth/login`, payload)
      .then((response) => {
        let authToken = response.data.data.x_auth_token;
        localStorage.setItem("AuthToken", authToken);
        setSpinner(false);
        navigate("./dashboard", { replace: true });
      })
      .catch((error) => {
        setSpinner(false)
        let errorMsg=error.response.data.message;
        let errorSt=error.response.data.status;
        setErrorStatu(errorSt)
        setErrorCode(errorMsg);
        setIsError(true);
      });
  };
  const handleError = () => {
   
    if(errorStatus == 400){
      return errorCode;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={submitForm}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {spinner ? (
                <LoadingButton
                  type="submit"
                  fullWidth
                  loading
                  loadingPosition="start"
                  startIcon="Sign In"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ color: "black" }}
                >
                  Sign In
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ color: "black", backgroundColor: "#fdc941" }}
                >
                  Sign In
                </Button>
              )}
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

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
