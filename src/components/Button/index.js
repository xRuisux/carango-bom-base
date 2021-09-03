import { Button as MaterialButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const StyledButton = withStyles(() => ({
  root: {
    padding: '1.2rem',
    marginTop: '1.5rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '2rem'
  }
}))(MaterialButton)

export function Button({ children, ...props }) {

  return <StyledButton {...props} >{children}</StyledButton>
}

export const DeleteButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    color: '#FFF'
  }
}))(StyledButton)

export function ButtonDelete({ ...props }) {
  return <DeleteButton {...props} />
}