const BrandService = {
  create(brand) {
    return fetch('https://carango-bom-api.herokuapp.com/brands', {
      method: 'POST',
      body: JSON.stringify(brand)
    }).then(r => r.json());
  },

  update(brand) {
    return fetch('https://carango-bom-api.herokuapp.com/brands/' + brand.id, {
      method: 'PUT',
      body: JSON.stringify(brand)
    }).then(r => r.json());
  },

  read(id) {
    return fetch('https://carango-bom-api.herokuapp.com/brands/' + id).then(r => r.json());
  },

  list() {
    return fetch('https://carango-bom-api.herokuapp.com/brands').then(r => r.json());
  },

  delete(brand) {
    return fetch('https://carango-bom-api.herokuapp.com/brands/' + brand.id, {
      method: 'DELETE',
    })
      .then(r => r.json());
  }
};

export default BrandService;