import { baseUrl } from "../api";

const DashboardService = {

  brandReport() {
    return fetch(`${baseUrl}/report/brand`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  }
};

export default DashboardService;