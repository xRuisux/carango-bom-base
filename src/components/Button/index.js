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
    //   backgroundColor: 'transparent',
    // }
  }
}))(MaterialButton)

export function Button({ children, bgColor, ...props }) {

  return <StyledButton {...props} >{children}</StyledButton>
}