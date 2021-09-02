import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Confirm } from "../../components/Confirm/Confirm"
import Table from "../../components/Table/Table"
import BrandService from "../../services/BrandService"
import VehicleService from "../../services/VehicleService"
import { formatCurrency, getOnlyNumbers } from "../../utils/currency"
import { delayFunc } from "../../utils/delayFunc"

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        BrandService.list(),
        VehicleService.list(),
      ]).then(([brandData, vehicleData]) => {
        setBrands(brandData?.data ?? [])
        setVehicles(vehicleData.data ?? [])
      })
      .catch(() => setError('Ocorreu um erro ao buscar os dados'))
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

  function removeVehicleFromList(id) {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id))
  }

  async function deleteVehicle() {
    setLoading(true)
    const { data } = await VehicleService.delete(selectedVehicle?.id)
    setSelectedVehicle(undefined)
    removeVehicleFromList(data.id)

    setIsConfirmOpen(false)
    delayFunc(() => setLoading(false))
  }

  function handleDelete() {
    setIsConfirmOpen(true)
  }

  function handleCreate() {
    history.push('/vehicle-form')
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
      <Confirm open={isConfirmOpen} message='Deseja mesmo excluir o veículo?' onConfirm={deleteVehicle} onCancel={() => setIsConfirmOpen(false)} />
      {
        !!error ? <p>{error}</p> 
        : <Table
        loading={loading}
        rows={rows}
        columns={columns}
        rowSelectedFunction={onSelectRow}
        selectedItem={selectedVehicle}
        updateItem={handleVehicleUpdate}
        deleteItem={handleDelete}
        addItem={handleCreate}
      />}
    </section>
  );
}