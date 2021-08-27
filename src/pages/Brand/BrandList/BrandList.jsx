
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Table from '../../../components/Table/Table';
import FormModal from '../../../components/FormModal/FormModal';
import BrandService from '../../../services/BrandService';

const columns = [
    { field: 'name', headerName: 'Brand', width: 200 }
];


function BrandList() {
    const [brands, setBrands] = useState([]);
    const [brandSelected, setBrandSelected] = useState();
    const [open, setOpen] = React.useState(false);
    // const classes = useStyles();
    const history = useHistory();

    console.log(brands);
    function create() {
        setOpen(true);
        // setModalShow(true);
        // history.push('/create-brand');
    }

    const handleClose = () => {
        setOpen(false);
      };

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
            <FormModal
            open = {open}
            handleClose = { handleClose }
            />
            
            <div style={{ height: 300, width: '100%' }}>
                <Table
                    rows={brands}
                    columns={columns}
                    addItem={create}
                    updateItem={update}
                    deleteItem={remove}
                    selectedItem={brandSelected}
                    rowSelectedFunction={setBrandSelected}
                />
            </div>
        </>
    );
}

export default BrandList;