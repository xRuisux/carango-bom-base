import { api } from './index'

describe('api', () => {
  
  it(('should make a post request'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => ( { id: 1, name: 'BMW' } )})

    const newData = await api.post('brand', 'BMW')
    
    expect(newData.data.name).toBe('BMW')
    expect(global.fetch).toHaveBeenCalled()
  })

  it(('should make a get request'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ 
      json: () => ( [{ id: 1, name: 'BMW' }, { id: 2, name: 'Audi'}] ),
      status: 200
    })

    const newData = await api.get('brand')

    expect(newData.data).toHaveLength(2)
    expect(global.fetch).toHaveBeenCalled()
  })

  it(('should return error message from a get request'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ 
      json: () => ( [{ id: 1, name: 'BMW' }, { id: 2, name: 'Audi'}] ),
      status: 500
    })

    const { error } = await api.get('brand')

    expect(error).toEqual('Erro ao buscar dados')
    expect(global.fetch).toHaveBeenCalled()
  })

  it(('should make a put request'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => ( { id: 1, name: 'Audi' } )})

    const newData = await api.put('brand', 'Audi')

    expect(newData.data.name).toBe('Audi')
    expect(global.fetch).toHaveBeenCalled()
  })

  it(('should make a delete request'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => ( { id: 1, name: 'BMW' } )})

    const newData = await api.delete('/brand/1')

    expect(newData.data.name).toBe('BMW')
    expect(global.fetch).toHaveBeenCalled()
  })
})