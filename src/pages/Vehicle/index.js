import { DataGrid } from "@material-ui/data-grid"
import { useEffect, useState } from "react"
import { FormVehicle } from "../../components/FormVehicle"
import Table from "../../components/Table/Table"
import MarcaService from "../../services/MarcaService"
import VehicleService from "../../services/VehicleService"

export function Vehicle() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [brands, setBrands] = useState([])
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchBrands () {
      const brandsResp = await MarcaService.list()
      setBrands(brandsResp)
    }
    async function fetchVehicles () {
      const vehiclesResp = await VehicleService.list()
      console.log(vehiclesResp)
      setVehicles(vehiclesResp)
    }

    fetchBrands()
    fetchVehicles()
  }, [])

  const columns = [
    { field: 'brand', headerName: 'Marca' },
    { field: 'model', headerName: 'Modelo' },
    { field: 'year', headerName: 'Ano' },
    { field: 'price', headerName: 'Preço' },
  ]

  const rows = vehicles.map(vehicle => {
    return { 
      id: vehicle.id,
      brand: vehicle.brandName,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price
    }
  })

  return (
    <>
    {/* <FormVehicle isVisible={isModalVisible} /> */}
    <section>
      {/* <FormVehicle brands={brands} /> */}
      <Table
        rows={rows}
        columns={columns}
      />
    </section>
    </>
  );
}