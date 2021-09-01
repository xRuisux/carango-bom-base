import { api } from "../api";

const DashboardService = {

  brandReport: () => {
    return api.get('report/brand');
  }
};

export default DashboardService;