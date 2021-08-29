import { DataGrid } from "@material-ui/data-grid"
import { useEffect, useState } from "react"
import { FormVehicle } from "../../components/FormVehicle"
import Table from "../../components/Table/Table"
import MarcaService from "../../services/MarcaService"
import VehicleService from "../../services/VehicleService"

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
    async function fetchBrands () {
      const brandsResp = await MarcaService.list()
      setBrands(brandsResp)
    }
    async function fetchVehicles () {
      const vehiclesResp = await VehicleService.list()
      setVehicles(vehiclesResp)
    }

    fetchBrands()
    fetchVehicles()
  }, [])

  function onSelectRow(rowInfo) {
    console.log({ rowInfo })
    if(!rowInfo) {
      setSelectedVehicle(undefined)
      return
    }
    console.log('depois')
    const { brand, ...otherInfo } = rowInfo
    const brandId = brands.find(brandObj => brandObj.name === brand)?.id
    
    setSelectedVehicle({
      brand: brandId,
      ...otherInfo
    })
  }

  function handleVehicleUpdate() {
    
  }

  const rows = vehicles.map(vehicle => {
    return { 
      id: vehicle.id,
      brand: vehicle.brandName,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price
    }
  })
console.log({selectedVehicle})
  return (
    <>
      <FormVehicle vehicleToEdit={selectedVehicle} brands={brands} isVisible={isModalVisible} />
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