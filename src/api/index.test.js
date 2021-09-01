// import api from "./index"
// describe('call api', () => {
//   it(('Should make a post request'), async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( { id: 1, name: 'BMW' } )});

//     const postReturn = await api.post('brand',);

//     expect(createdBrand.name).toBe('BMW');
//   });

//   it(('Should update a brand'), async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( { id: 1, name: 'FIAT' } )});

//     const updatedBrand = await BrandService.update( { id: 1, name: 'FIAT' } );

//     expect(updatedBrand.name).toBe('FIAT');
//   });

//   it(('Should return a brand'), async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( { id: 1, name: 'BMW' } )});

//     const returnedBrand = await BrandService.read(1);

//     expect(returnedBrand.name).toBe('BMW');
//   });

//   it(('Should list the brands'), async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( [{ id: 1, name: 'BMW' }, { id: 2, name: 'FIAT' }] )});

//     const brandList = await BrandService.list();

//     expect(brandList).toStrictEqual( [{ id: 1, name: 'BMW' }, { id: 2, name: 'FIAT' }] );
//   });

//   it(('Should delete a brand'), async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValue( {json: () => ( {id: 1, name: 'BMW'} )});

//     const deletedbrand = await BrandService.delete( { id: 1, name: 'BMW' } );

//     expect(deletedbrand.id).toBe(1);
//   });
// });