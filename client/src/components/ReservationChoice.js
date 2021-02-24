import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography, Slide }  from '@material-ui/core';
import { Close } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReservationChoice(props) {
  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);
  const setOpen = props.setOpen;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Available Reservations
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Next
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}
