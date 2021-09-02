import { api } from "../api";

const DashboardService = {

  brandReport() {
    return fetch('http://localhost:8080/report/brand', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  }
};

export default DashboardService;