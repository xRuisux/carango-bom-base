import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem 0',
    width: '100%',
    fontSize: '1.2rem',
    color: theme.palette.darkGray,
    fontWeight: "bold",

    '& input': {
      borderRadius: '.4rem',
      border: `1px solid ${theme.palette.gray}`,
      padding: '1rem',
      display: 'block',
      marginTop: '.5rem'
    }
  },
}))