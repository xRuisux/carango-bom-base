import { Select, TextField } from "@material-ui/core"
import { useState } from "react";

export function FormVehicle({ onCancel, confirmBtnLabel = 'cadastrar' }) {
  const [model, setModel] = useState('');
  const [year, setYear] = useState();
  const [price, setPrice] = useState('');

  const isAllFieldsFilled = !!model && year && !!price

  return (
    <section>
      <form>
        {/* <Select 
          placeholder="Ex: Honda"
          id="brand"
          label="Marca"
          name="brand"
          variant="outlined"
          onChange={({ target: { value } }) => setPassword(value)}
          onBlur={validateFields}
          helperText={errors.password.text}
          error={!errors.password.valid}
        /> */}
        <TextField 
          placeholder="Ex: 2021"
          id="model"
          label="Modelo"
          name="model"
          variant="outlined"
          onChange={({ target: { value } }) => setModel(value)}
          // pelo menos 1979
          // onBlur={validateFields}
          // helperText={errors.password.text}
          // error={!errors.password.valid}
        />
        <TextField 
          placeholder="Ex: 2021"
          id="year"
          type="number"
          label="Ano"
          name="year"
          variant="outlined"
          onChange={({ target: { value } }) => setYear(Number(value))}
          // pelo menos 1979
          // onBlur={validateFields}
          // helperText={errors.password.text}
          // error={!errors.password.valid}
        />
        <TextField 
          placeholder="Ex: 2021"
          id="price"
          label="Valor"
          name="price"
          variant="outlined"
          onChange={({ target: { value } }) => setPrice(value)}
          // pelo menos 1979
          // onBlur={validateFields}
          // helperText={errors.password.text}
          // error={!errors.password.valid}
        />
      </form>

      <footer>
        <button onClick={onCancel}>cancelar</button>
        <button disabled={!isAllFieldsFilled} type="submit">{confirmBtnLabel}</button>
      </footer>
    </section>
  )
}