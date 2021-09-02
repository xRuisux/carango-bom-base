import '@testing-library/jest-dom';
import DashboardService from './DashboardService';

describe("Dashboard Service", () => {
  //jest.mock('../../services/DashboardService', () => jest.fn());
  it(('Should return my report'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( [
        {
            brandName: "Volks",
            totalVehicles: 1,
            totalAmount: 1000000
        },
        {
            brandName: "Toyota",
            totalVehicles: 2,
            totalAmount: 200000
        },
    ] )});

    const report = await DashboardService.brandReport();

    expect(report).toStrictEqual( [
        {
            brandName: "Volks",
            totalVehicles: 1,
            totalAmount: 1000000
        },
        {
            brandName: "Toyota",
            totalVehicles: 2,
            totalAmount: 200000
        },
    ] );
  });
  /*
  it("render correctly", async() => {
    api.get = jest.fn(() => Promise.resolve({data:[
        {
            brandName: "Volks",
            totalVehicles: 1,
            totalAmount: 1000000
        },
        {
            brandName: "Toyota",
            totalVehicles: 2,
            totalAmount: 200000
        },
    ]}));
    render(
        <Dashboard />
        )

   await waitFor(() => expect(screen.getByText('Relatório de Vendas')).toBeInTheDocument())
   await waitFor(() => expect(screen.getByText('Volks')).toBeInTheDocument())
   await waitFor(() => expect(screen.getByText('Toyota')).toBeInTheDocument())
   //await waitFor(() => expect(screen.getAllByText('R$ 10.000,00')[0]).toBeInTheDocument())

  })

  it("render server error message", async() => {
    DashboardService.brandReport = jest.fn(() => Promise.reject());
    render(
        <Dashboard />
        )

   await waitFor(() => expect(screen.getByText('Houve um erro ao carregar o relatórios')).toBeInTheDocument())

  })*/

})