import { FormControl, Select, InputLabel, TextField, FormHelperText } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import useErrors from "../../hooks/useErrors"
import BrandService from "../../services/BrandService"
import VehicleService from "../../services/VehicleService"
import { formatCurrency, getOnlyNumbers } from "../../utils/currency"
import { delayFunc } from "../../utils/delayFunc"
import { Button } from "../Button"
import s from './FormVehicle.module.css'

const initialValues = {
  brand: '',
  model: '',
  year: '',  
  price: ''
}

const MIN_YEAR = 1979
const PRICE_ZERO = '0,00'

export function FormVehicle() {

  const [formValues, setFormValues] = useState(initialValues)
  const [brands, setBrands] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function fetchBrands() {
      const  data  = await BrandService.list()
      setBrands(data)
    }

    fetchBrands()
  }, [])

  useEffect(() => {

    const localStorageVehicle = localStorage.getItem('vehicle')
    if(!!localStorageVehicle) {
      const { price, ...rest } = JSON.parse(localStorageVehicle)
      
      return setFormValues({ price: formatCurrency(price.toString()), ...rest})
    }

    setFormValues(initialValues)
  }, [])

  const validations = {
    model: value => !!value.trim() ? { valid: true } : { valid: false, text: 'Insira um modelo' },
    price: value => !!value && value !== PRICE_ZERO ? { valid: true } : { valid: false, text: 'Insira o preço' },
    year: value => value >= MIN_YEAR ? { valid: true } : { valid: false, text: 'Insira um ano maior ou igual a 1979' },
    brand: value => value !== '' ? { valid: true } : { valid: false, text: 'Selecione uma marca' }
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

  function goBack() {
    localStorage.removeItem('vehicle')
    history.push('/vehicle')
  }

  async function submitForm() {
    if(allFieldsValid() && isAllFieldsFilled()) {
      const { brand, year, price, model } = formValues
      const formattedValues = { brandId: brand, year: Number(year), price: Number(getOnlyNumbers(price)), model }

      if(formValues?.id) {
        await VehicleService.edit(formValues.id, formattedValues)
      } else {
        await VehicleService.create(formattedValues)
      }

      setFormValues(initialValues)
      localStorage.removeItem('vehicle')
      history.push('/vehicle')
    }
  }
  
  const brandOptions = brands.map(brand => (<option key={brand.id} value={brand.id}>{brand.name}</option>))

  const isEditing = !!formValues?.id
  const message = isEditing ? 'Alterar': 'Cadastrar'

  return (
    <div className={s.container}>
      <h2>{message} Veículo</h2>
      <section className={s.content}>
        <form>
          <FormControl variant="outlined" error={!errors.brand.valid}>
            <InputLabel className={`${isEditing || formValues.brand && s.selectLabel}`} shrink={isEditing || formValues.brand} id="brandLabel" htmlFor='brand'>Marca</InputLabel>
            <Select
              native
              data-testid="wrapper"
              labelId="brandLabel"
              placeholder="Ex: Honda"
              id="brand"
              label="Marca"
              name="brand"
              variant="outlined"
              value={formValues.brand}
              onChange={updateFormValues}
              onBlur={validateFields}
              inputProps={{
                name: 'brand',
                id: 'brand',
                placeholder: 'Selecione uma marca',
                'data-testid': "select",
              }}
            >
              <option value=''></option>
              {brandOptions}
            </Select>
            <FormHelperText>{errors.brand.text}</FormHelperText>
          </FormControl>
          <TextField
            className={s.formField}
            placeholder="Ex: Civic"
            id="model"
            label="Modelo"
            name="model"
            variant="outlined"
            value={formValues.model}
            onChange={updateFormValues}
            helperText={errors.model.text}
            error={!errors.model.valid}
          />
          <TextField 
            className={s.formField}
            placeholder="Ex: 2021"
            id="year"
            type="number"
            label="Ano"
            name="year"
            variant="outlined"
            value={formValues.year}
            onChange={updateFormValues}
            helperText={errors.year.text}
            error={!errors.year.valid}
          />
          <TextField
            className={s.formField}
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
            helperText={errors.price.text}
            error={!errors.price.valid}
          />
        </form>

        <footer>
          <Button type="submit" variant="contained" color="primary" onClick={submitForm}>{message}</Button>
          <Button variant="contained" color="secondary" onClick={goBack}>Cancelar</Button>
        </footer>
      </section>
    </div>
  )
}