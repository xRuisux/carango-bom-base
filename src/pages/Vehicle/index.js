import { DataGrid } from "@material-ui/data-grid"
import { useEffect, useState } from "react"
import { FormVehicle } from "../../components/FormVehicle"
import Table from "../../components/Table/Table"
import BrandService from "../../services/BrandService"
import VehicleService from "../../services/VehicleService"
import { formatCurrency, getOnlyNumbers } from "../../utils/currency"

const columns = [
  { field: 'brand', headerName: 'Marca' },
  { field: 'model', headerName: 'Modelo' },
  { field: 'year', headerName: 'Ano' },
  { field: 'price', headerName: 'Preço' },
]

export function Vehicle() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [brands, setBrands] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState()

  useEffect(() => {
    async function fetchData() {
       Promise.all([
        BrandService.list(),VehicleService.list()
      ]).then(([brandData, vehicleData]) => {
        setBrands(brandData?.data ?? [])
        setVehicles(vehicleData.data ?? [])
      })
      .catch(err => console.log(err))
    }

    fetchData()
  }, [])

  function onSelectRow(rowInfo) {
    console.log({ rowInfo })
    if(!rowInfo) {
      setSelectedVehicle(undefined)
      return
    }
    
    const { brand, ...otherInfo } = rowInfo
    const brandId = brands.find(brandObj => brandObj.name === brand)?.id
    
    setSelectedVehicle({
      ...otherInfo,
      brand: brandId,
      price: Number(getOnlyNumbers(otherInfo.price))
    })
  }

  function updateVehicleList(newVehicle) {
    const filteredVehicles = vehicles.filter(vehicle => vehicle.id !== newVehicle?.id)
    setVehicles([...filteredVehicles, { ...(newVehicle ?? {}) }])
  }

  async function handleFormSubmission(formValues, id = undefined) {
    const { data } = await (async () => {
      if(id) return await VehicleService.edit(id, formValues)
      return await VehicleService.create(formValues)
    })()

    updateVehicleList(data)
  }

  const rows = vehicles.map(vehicle => {
    return { 
      id: vehicle.id,
      brand: vehicle.brandName,
      model: vehicle.model,
      year: vehicle.year,
      price: formatCurrency(vehicle.price)
    }
  })
console.log({selectedVehicle})
  return (
    <>
      <FormVehicle vehicleToEdit={selectedVehicle} brands={brands} isVisible={isModalVisible} onSubmit={handleFormSubmission} />
      <section>
        {/* <FormVehicle brands={brands} /> */}
        <Table
          rows={rows}
          columns={columns}
          rowSelectedFunction={onSelectRow}
          selectedItem={selectedVehicle}
          // updateItem={}
        />
      </section>
    </>
  );
}