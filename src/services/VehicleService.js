import { api } from "../api";

const VehicleService = {
  create: (data) => {
    return api.post('vehicle', data)
  },
  list: () => {
    return api.get('vehicle')
  },
  edit: (id, data) => {
    return api.put(`vehicle/${id}`, data)
  }
};

export default VehicleService;