import { api } from "../api";

const UserService = {
  list: () => api.get('user'),
  delete: (id) => api.delete(`user/${id}`)
};

export default UserService;