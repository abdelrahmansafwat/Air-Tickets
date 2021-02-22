import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));

function ReserveForm() {
    const classes = useStyles();
    
    return (
        <Paper elevation={10}>
        Hiya
      </Paper>
    );
  }
  
export default ReserveForm;