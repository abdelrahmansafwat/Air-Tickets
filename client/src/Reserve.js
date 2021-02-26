import ReserveForm from "./components/ReserveForm";
import { makeStyles } from "@material-ui/core/styles";

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

function Reserve() {
    const classes = useStyles();
    
    return (
        <ReserveForm />
    );
  }
  
export default Reserve;