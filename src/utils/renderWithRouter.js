import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export function renderWithRouter(Component) {
  return (
    render(<MemoryRouter>{Component}</MemoryRouter>)
  )
}