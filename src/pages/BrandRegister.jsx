import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErrors from '../hooks/useErrors';
import BrandService from '../services/BrandService';

function BrandRegister() {

    const [brand, setBrand] = useState("");

    const history = useHistory();

    const { id } = useParams();

    const validations = {
        brand: data => {
            if (data && data.length >= 3) {
                return { valid: true };
            } else {
                return { valid: false, texto: " A marca deve ter ao menos 3 letras." }
            }
        }
    }

    const [erros, validateFields, allFieldsValid] = useErrors(validations);

    function cancel() {
        history.goBack();
    }

    // TODO: Avaliar remover disable na próxima linha
    useEffect(() => {
        if (id) {
            BrandService.read(id)
                .then(brand => setBrand(brand.name));
        }
    }, [id]); // eslint-disable-line

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (allFieldsValid()) {
                if (id) {
                    BrandService.update({ id, name: brandName })
                        .then(res => {
                            history.goBack();
                        });
                } else {
                    BrandService.create({ nome: brandName })
                        .then(res => {
                            setbrand("");
                            history.goBack();
                        });
                }
            }
        }}>
            <TextField
                value={brandName}
                onChange={evt => setBrand(evt.target.value)}
                onBlur={validateFields}
                helperText={erros.brand.text}
                error={!erros.brand.valid}
                name="brandName"
                id="brandName"
                label="Marca"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!allFieldsValid()}>
                {id ? 'Alterar' : 'Cadastrar'}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={cancel}>
                Cancelar
            </Button>
        </form>
    );
}

export default BrandRegister;