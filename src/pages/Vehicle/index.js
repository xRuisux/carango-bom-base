import { useState } from "react"
import { FormVehicle } from "../../components/FormVehicle"

export function Vehicle() {

  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
    <FormVehicle isVisible={isModalVisible} />
    <section>
      <div>
        <button onClick={() => setIsModalVisible(true)}>adicionar</button>
        <button>excluir</button>
        <button>alterar</button>
      </div>
    </section>
    </>
  );
}