import { Dialog, DialogActions, DialogTitle, makeStyles } from "@material-ui/core";
import { Button } from "../Button";

const useStyles = makeStyles(({
  h2: {
    fontSize: '1.5rem',
    fontWeight: 'normal'
  }
}))

export function Confirm({ open, message, onConfirm, onCancel }) {

  const classes = useStyles()

  return (
    <Dialog open={open}>
      <DialogTitle disableTypography>
        <h2 className={classes.h2}>{message}</h2>
      </DialogTitle>
      <DialogActions>
        <Button color='secondary' onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}