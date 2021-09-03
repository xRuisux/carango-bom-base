import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../../components/Table/Table';
import BrandService from '../../services/BrandService';
import { Confirm } from "../../components/Confirm/Confirm"
import { delayFunc } from "../../utils/delayFunc"

const columns = [
    { field: 'name', headerName: 'Marca', width: 200 }
];

function BrandList() {
    const history = useHistory();
    const [error, setError] = useState('')
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
        try {
            await BrandService.delete(brandSelected);
            setBrandSelected(null);
            loadBrands();
    
            setIsConfirmOpen(false)
            delayFunc(() => setLoading(false))
        } catch (error) {
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

    return (
        <>
        <Confirm open={isConfirmOpen} message='Deseja mesmo excluir a marca?' onConfirm={remove} onCancel={() => setIsConfirmOpen(false)} />
        {
            !!error ? <p>{error}</p> 
            : <div style={{ height: 300, width: '100%' }}>
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
            </div>
            }

        </>
    );
}

export default BrandList;