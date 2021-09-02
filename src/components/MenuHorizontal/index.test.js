import { act, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import MenuHorizontal from ".";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<MenuHorizontal />", () => {
  it("should display login and veículos", () => {
    render(
        <BrowserRouter>
            <MenuHorizontal isAuthenticated={false} />
        </BrowserRouter>
    )

    expect(screen.getByText('login')).toBeInTheDocument()
    expect(screen.getByText('Veículos')).toBeInTheDocument()

  })
  it("should display at least veiculos, marcas e sair", () => {
    render(
        <BrowserRouter>
            <MenuHorizontal isAuthenticated={true} />
        </BrowserRouter>
    )

    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(screen.getByText('Veículos')).toBeInTheDocument()
    expect(screen.getByText('Marcas')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()

  })
//   it("should redirect user when click on logout", async () => {
//     const { 
//         container, 
//         getByText,  
//       } = render(
//         <BrowserRouter>
//             <MenuHorizontal isAuthenticated={true} />
//         </BrowserRouter>
//       );
    
//       await act(async () => {
//         const logout = getByText(/Sair/);
//         userEvent.click(logout)

//       });
//       await waitFor(() => expect(container).toHaveTextContent(/login/));
//       await waitFor(() => expect(container).toHaveTextContent(/Veículos/));
//     });

})