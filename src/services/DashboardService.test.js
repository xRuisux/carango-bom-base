import { api } from '../api';
import DashboardService from './DashboardService';

//jest.mock('../api', () => jest.fn())
// describe('DashboardService', () => {
//     it(('Should return brand report'), async () => {
//       api.get('report/brand') = jest.fn(() => Promise.resolve({ data:[
//         {
//             brandName: "Volks",
//             totalVehicles: 1,
//             totalAmount: 1000000
//         },
//         {
//             brandName: "Toyota",
//             totalVehicles: 2,
//             totalAmount: 200000
//         },
//     ]}));


//     const brandReportList = await DashboardService.brandReport();

//     expect(brandReportList).toStrictEqual([
//       {
//           brandName: "Volks",
//           totalVehicles: 1,
//           totalAmount: 1000000
//       },
//       {
//           brandName: "Toyota",
//           totalVehicles: 2,
//           totalAmount: 200000
//       },
//   ] );
//   });

// }); 