import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',

    '& header': {
      display: 'flex',
      alignSelf: 'flex-end',
      justifyContent: 'space-between',
      width: '30%',
      height: '60px'
    }
  },
  table: {
    fontSize: '1.2rem',
    height: '100%'
  },
  tableContainer: {
    height: '70vh',
    width: '100%',
    margin: '2rem 0'
  }
}))