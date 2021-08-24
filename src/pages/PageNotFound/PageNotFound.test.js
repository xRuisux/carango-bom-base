import { screen } from "@testing-library/react"
import { PageNotFound } from "."
import { renderWithRouter } from "../../utils/renderWithRouter"


describe('<PageNotFound />', () => {
  it('should render correctly', () => {
    const { container } = renderWithRouter(<PageNotFound />)

    expect(screen.getByRole('heading', { name: /página não encontrada/i})).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar para o início/i})).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})