import { BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Routes from "./Routes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <div className={classes.root}>
          <Routes />
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
