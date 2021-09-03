import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../../components/Table/Table';
import BrandService from '../../services/BrandService';
import { Confirm } from "../../components/Confirm/Confirm"
import { delayFunc } from "../../utils/delayFunc"
import { Snackbar } from '@material-ui/core';

const columns = [
    { field: 'name', headerName: 'Marca', width: 200 }
];

function BrandList() {
    const history = useHistory();
    const [error, setError] = useState('')
    const vertical = 'top';
    const horizontal = 'center';
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false)
    const [brandSelected, setBrandSelected] = useState();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    function create() {
        history.push('/create-brand/');

    }

    function update() {
        if (brandSelected) {
            history.push('/update-brand/' + brandSelected?.id);
        }
    }

    async function remove() {
        setLoading(true)
        const data = await BrandService.delete(brandSelected);
        setBrandSelected(null);
        loadBrands();

        setIsConfirmOpen(false)
        delayFunc(() => setLoading(false))

        if(data && data.error) {
            setError('Houve uma falha ao excluir a marca. verifique se essa marca já possui veículos associados!')
        }
    }

    function handleDelete() {
        setIsConfirmOpen(true)
    }

    useEffect(() => loadBrands(), []);

    async function loadBrands() {
        const data = await BrandService.list();

        if(data) {
            setBrands(data);
        } else {
            setError('Ocorreu um erro ao buscar os dados');
        }
      }

      function handleClose() {
          setError("");
      }

    return (
    <>
        <Confirm open={isConfirmOpen} message='Deseja mesmo excluir a marca?' onConfirm={remove} onCancel={() => setIsConfirmOpen(false)} />
        <Snackbar 
            open={!!error} 
            anchorOrigin={{ vertical, horizontal }} 
            autoHideDuration={5000} 
            message = {error}
            key={vertical + horizontal} 
            onClose={handleClose}>
        </Snackbar>
        <Table
            loading={loading}
            rows={ brands }
            columns={ columns }
            addItem={ create }
            updateItem={ update }
            deleteItem={ handleDelete }
            selectedItem={ brandSelected }
            rowSelectedFunction={ setBrandSelected }
        />
    </>
    );
}

export default BrandList;