import SearchForm from "./components/SearchForm";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
  }));

function Search() {
    const classes = useStyles();
    
    return (
        <SearchForm />
    );
  }
  
export default SearchForm;