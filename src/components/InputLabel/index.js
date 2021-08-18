import { useStyles } from "./styles"

export function InputLabel({ label, placeholder, onInputChange, ...props }) {

  const classes = useStyles()

  return (
    <label className={classes.root}>
      {label}:
      <input placeholder={placeholder} onChange={onInputChange} {...props} />
    </label>
  )
}