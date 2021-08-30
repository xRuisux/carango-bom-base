import { DataGrid } from "@material-ui/data-grid"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
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

export function VehicleList() {
  const [brands, setBrands] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState()
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        BrandService.list(),
        VehicleService.list()
      ]).then(([brandData, vehicleData]) => {
        setBrands(brandData?.data ?? [])
        setVehicles(vehicleData.data ?? [])
      })
      .catch(err => console.log(err))
    }

    fetchData()
  }, [])

  function handleVehicleUpdate() {
    localStorage.setItem('vehicle', JSON.stringify(selectedVehicle))
    history.push(`/vehicle-form`)
  }

  function onSelectRow(rowInfo) {
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

  const rows = vehicles.map(vehicle => {
    return { 
      id: vehicle.id,
      brand: vehicle.brandName,
      model: vehicle.model,
      year: vehicle.year,
      price: formatCurrency(vehicle.price)
    }
  })

  return (
    <section>
      <Table
        rows={rows}
        columns={columns}
        rowSelectedFunction={onSelectRow}
        selectedItem={selectedVehicle}
        updateItem={handleVehicleUpdate}
        addItem={() => history.push('/vehicle-form')}
      />
    </section>
  );
}