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

    function remove() {
        BrandService.delete(brandSelected)
            .then(() => {
                setBrandSelected(null);
                loadBrands();
            });
    }

    useEffect(() => loadBrands(), []);

    function loadBrands() {
        BrandService.list()
            .then(data => setBrands(data));
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