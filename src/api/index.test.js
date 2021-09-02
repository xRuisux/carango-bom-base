/*
import { api } from ".";

describe('api with Brand endpoints', () => {
  it(('Should create a brand'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( { id: 1, name: 'BMW' } )});

    const createdBrand = await api.post('brand', {name: 'BMW'});

    expect(createdBrand.name).toBe('BMW');
  });

  it(('Should update a brand'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( { id: 1, name: 'FIAT' } )});

    const updatedBrand = await api.update('brand/1', { id: 1, name: 'FIAT' } );

    expect(updatedBrand.name).toBe('FIAT');
  });

  it(('Should return a brand'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( { id: 1, name: 'BMW' } )});

    const returnedBrand = await api.get('brand/1');

    expect(returnedBrand.name).toBe('BMW');
  });

  it(('Should list the brands'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( [{ id: 1, name: 'BMW' }, { id: 2, name: 'FIAT' }] )});

    const brandList = await api.get('brand');

    expect(brandList).toStrictEqual( [{ id: 1, name: 'BMW' }, { id: 2, name: 'FIAT' }] );
  });

  it(('Should delete a brand'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue( {json: () => ( {id: 1, name: 'BMW'} )});

    const deletedbrand = await api.delete('brand/1');

    expect(deletedbrand.id).toBe(1);
  });
}); 

*/