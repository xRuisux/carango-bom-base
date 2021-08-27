import { Button as MaterialButton } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/core/styles'

export const StyledButton = withStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.primary.yellow,
    padding: '1.2rem',
    marginTop: '1.5rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '2rem',

    // '&:hover': {
    //   backgroundColor: theme.palette.primary.yellow,
    // }
  }
}))(MaterialButton)

export function Button({ children, bgColor, ...props }) {

  const theme = useTheme()

  return <MaterialButton {...props} >{children}</MaterialButton>
}