import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function Snackbar() {
  const { enqueueSnackbar } = useSnackbar();

 ( function handleClick  () {
    enqueueSnackbar('Product Create Succesfully...');
  })()

  
  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
    </React.Fragment>
  );
}

export default function SimpleSnackbar() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Snackbar />
    </SnackbarProvider>
  );
}
