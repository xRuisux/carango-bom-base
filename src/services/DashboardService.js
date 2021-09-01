const DashboardService = {
    getBrandReport() {
        return fetch('https://localhost:8080/report/brands').then(r => r.json());
    }
  
}
export default DashboardService