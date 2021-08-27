import { api } from "../api";

const VehicleService = {
  create: (data) => {
    return api.post('vehicle', data)
  },
  list: () => {
    return api.get('vehicle')
  }
};

export default VehicleService;