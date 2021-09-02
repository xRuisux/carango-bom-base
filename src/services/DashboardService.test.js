import { act, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import { api } from "../api";
import Dashboard from "../pages/Dashboard";



describe("Dashboard Service", () => {
  //jest.mock('../../services/DashboardService', () => jest.fn());
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
/*
  it("render server error message", async() => {
    DashboardService.brandReport = jest.fn(() => Promise.reject());
    render(
        <Dashboard />
        )

   await waitFor(() => expect(screen.getByText('Houve um erro ao carregar o relatórios')).toBeInTheDocument())

  })*/

})