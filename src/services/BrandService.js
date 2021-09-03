import { baseUrl } from "../api";

const BrandService = {
  create(brand) {
    return fetch(`${baseUrl}/brand`, {
      method: 'POST',
      body: JSON.stringify(brand),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  },

  update(brand) {
    return fetch(`${baseUrl}/brand/${brand.id}`, {
      method: 'PUT',
      body: JSON.stringify(brand),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  },

  read(id) {
    return fetch(`${baseUrl}/brand/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r => r.json());
  },

  list() {
    return fetch(`${baseUrl}/brand`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(r =>  r.json());
  },

  delete(brand) {
    return fetch(`${baseUrl}/brand/${brand.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(r => r.json());
  },

};

export default BrandService;