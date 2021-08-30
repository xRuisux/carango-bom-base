import { FormControl, Select, InputLabel, TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import useErrors from "../../hooks/useErrors"
import { formatCurrency, getOnlyNumbers } from "../../utils/currency"
import { delayFunc } from "../../utils/delayFunc"
import { Button } from "../Button"

const initialValues = {
  brand: '',
  model: '',
  year: '',  
  price: ''
}

const MIN_YEAR = 1979
const PRICE_ZERO = '0,00'

export function FormVehicle({ brands, vehicleToEdit, onSubmit, onCancel, confirmBtnLabel = 'cadastrar' }) {

  const [formValues, setFormValues] = useState(initialValues)

  useEffect(() => {
    if(vehicleToEdit) {
      const { price, ...rest } = vehicleToEdit
      
      return setFormValues({ price: formatCurrency(price.toString()), ...rest})
    } 
    setFormValues(initialValues)
  }, [vehicleToEdit])

  const validations = {
    model: value => !!value ? { valid: true } : { valid: false, text: 'Insira um modelo' },
    price: value => !!value && value !== PRICE_ZERO ? { valid: true } : { valid: false, text: 'Insira o preço' },
    year: value => value >= MIN_YEAR ? { valid: true } : { valid: false, text: 'Insira um ano maior ou igual a 1979' },
    brand: value => value !== 'none' ? { valid: true } : { valid: false, text: 'Selecione uma marca' }
  }

  const [errors, validateFields, allFieldsValid] = useErrors(validations)

  function updateFormValues(e) {
    const { target: { value, name } } = e
    delayFunc(() => validateFields({ name, value, ...e }), 500)
    setFormValues({ ...formValues, [name]: value })
  }

  function handlePriceChange({ target: { value } }) {
    const validPrice = getOnlyNumbers(value)
    const formattedPrice = formatCurrency(validPrice)
    
    setFormValues({ ...formValues, price: formattedPrice })
  }

  function isAllFieldsFilled () {
    return Object.values(formValues).every(value => !!value)
  }

  async function submitForm() {
    if(allFieldsValid() && isAllFieldsFilled()) {
      const { brand, year, price, model } = formValues
      const formattedValues = { brandId: brand, year: Number(year), price: Number(getOnlyNumbers(price)), model }

      if(vehicleToEdit?.id) {
        await onSubmit(formattedValues, vehicleToEdit.id)
      } else {
        await onSubmit(formattedValues)
      }

      setFormValues(initialValues)
    }
  }
  
  const brandOptions = brands.map(brand => (<option key={brand.id} value={brand.id}>{brand.name}</option>))

  return (
    <section>
      <form style={{ padding: 30 }}>
        <FormControl variant="outlined">
          <InputLabel id="brandLabel" htmlFor='brand'>Marca</InputLabel>
          <Select 
            labelId="brandLabel"
            placeholder="Ex: Honda"
            id="brand"
            label="Marca"
            name="brand"
            variant="outlined"
            value={formValues.brand}
            onChange={updateFormValues}
            inputProps={{
              name: 'brand',
              id: 'brand'
            }}
            // onBlur={validateFields}
            helperText={errors.brand.text}
            error={!errors.brand.valid}
          >
            <option value=''></option>
            {brandOptions}
          </Select>
        </FormControl>
        <TextField
          placeholder="Ex: Civic"
          id="model"
          label="Modelo"
          name="model"
          variant="outlined"
          value={formValues.model}
          onChange={updateFormValues}
          // onBlur={validateFields}
          helperText={errors.model.text}
          error={!errors.model.valid}
        />
        <TextField 
          placeholder="Ex: 2021"
          id="year"
          type="number"
          label="Ano"
          name="year"
          variant="outlined"
          value={formValues.year}
          onChange={updateFormValues}
          // onBlur={validateFields}
          helperText={errors.year.text}
          error={!errors.year.valid}
        />
        <TextField 
          placeholder="Ex: 2021"
          id="price"
          label="Valor"
          name="price"
          variant="outlined"
          value={formValues.price}
          onChange={(e) => {
            handlePriceChange(e)
            delayFunc(() => validateFields(e), 1000)
          }}
          // onBlur={validateFields}
          helperText={errors.price.text}
          error={!errors.price.valid}
        />
      </form>

      <footer>
        <Button  variant="contained" color="primary" onClick={submitForm}>Cadastrar</Button>
        <Button variant="contained" color="secondary">Cancelar</Button>
      </footer>
    </section>
  )
}