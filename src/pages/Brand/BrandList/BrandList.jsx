import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import BrandService from '../../../services/BrandService';

const columns = [
    { field: 'name', headerName: 'Brand', width: 200 }
];

function BrandList() {
    const [brands, setBrands] = useState([]);
    const [brandSelected, setBrandSelected] = useState();
    const history = useHistory();

    function create() {
        history.push('/create-brand/');

    }

    function update() {
        history.push('/update-brand/' + brandSelected.id);
    }

    async function remove() {
        await BrandService.delete(brandSelected);
        setBrandSelected(null);
        loadBrands();
    }

    useEffect(() => loadBrands(), []);
 
    async function loadBrands() {
        const data = await BrandService.list();
        setBrands(data);
      }

    return (
        <>
            <div style={{ height: 300, width: '100%' }}>
                <Table
                    rows={ brands }
                    columns={ columns }
                    addItem={ create }
                    updateItem={ update }
                    deleteItem={ remove }
                    selectedItem={ brandSelected }
                    rowSelectedFunction={ setBrandSelected }
                />
            </div>
        </>
    );
}

export default BrandList;