const BrandService = {
  create(brand) {
    return fetch('http://localhost:8080/brand', {
      method: 'POST',
      body: JSON.stringify(brand),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  },

  update(brand) {
    return fetch('http://localhost:8080/brand/' + brand.id, {
      method: 'PUT',
      body: JSON.stringify(brand),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  },

  read(id) {
    return fetch('http://localhost:8080/brand/' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  },

  list() {
    console.log(localStorage.getItem('token'));
    return fetch('http://localhost:8080/brand', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  },

  delete(brand) {
    return fetch('http://localhost:8080/brand/' + brand.id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(r => r.json());
  }
};

export default BrandService;