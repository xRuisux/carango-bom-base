import { useEffect, useState } from "react"
import { FormVehicle } from "../../components/FormVehicle"
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
      console.log({ vehiclesResp })
      setVehicles(vehiclesResp)
    }

    fetchBrands()
    fetchVehicles()
  }, [])

  return (
    <>
    {/* <FormVehicle isVisible={isModalVisible} /> */}
    <section>
      <div>
        <button onClick={() => setIsModalVisible(true)}>adicionar</button>
        <button>excluir</button>
        <button>alterar</button>
        <FormVehicle brands={brands} />
      </div>
    </section>
    </>
  );
}