import { act, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import Dashboard from "./Dashboard";
import DashboardService from '../../services/DashboardService';


describe("<Dashboard />", () => {
  //jest.mock('../../services/DashboardService', () => jest.fn());
  it("render correctly", async() => {
    jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
        format: jest.fn(() => '10.000,00')
    }))
    /*DashboardService.brandReport = jest.fn(() => Promise.resolve({data:[
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
    ]}));*/
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
    render(
        <Dashboard />
        )

   await waitFor(() => expect(screen.getByText('Relatório de Vendas')).toBeInTheDocument())
   await waitFor(() => expect(screen.getByText('Volks')).toBeInTheDocument())
   await waitFor(() => expect(screen.getByText('Toyota')).toBeInTheDocument())
   await waitFor(() => expect(screen.getAllByText('R$ 10.000,00')[0]).toBeInTheDocument())

  })

  it("render server error message", async() => {
    DashboardService.brandReport = jest.fn(() => Promise.reject());
    render(
        <Dashboard />
        )

   await waitFor(() => expect(screen.getByText('Houve um erro ao carregar o relatórios')).toBeInTheDocument())

  })

})