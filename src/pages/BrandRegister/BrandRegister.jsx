import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErrors from '../../hooks/useErrors';
import BrandService from '../../services/BrandService';
import s from './BrandRegister.module.css'

function BrandRegister() {
    const { id } = useParams();
    const history = useHistory();
    const [brand, setBrand] = useState("");

    const validations = {
        brand: data => {
            if (data && data.length >= 3) {
                return { valid: true };
            } else {
                return { valid: false, text: "A marca deve ter ao menos 3 letras." }
            }
        }
    }

    const [erros, validateFields, allFieldsValid] = useErrors(validations);

    function cancel() {
        history.goBack();
    }

    useEffect(() => {
        if (id) {
            BrandService.read(id)
                .then(brandResponse => setBrand(brandResponse.name));
        }
    }, [id]);


    const message = id ? 'Alterar' : 'Cadastrar'

    return (
        <div className={s.container}>
            <h2>{message} Marca</h2>
            <section className={s.content}>
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    if (allFieldsValid()) {
                        if (id) {
                            await BrandService.update({ id, name: brand });
                            history.goBack();
                        } else {
                            await BrandService.create({ name: brand })
                            setBrand("");
                            history.goBack();
                        }
                    }
                }}>
                    <TextField
                        value={brand}
                        onChange={evt => setBrand(evt.target.value)}
                        onBlur={validateFields}
                        helperText={erros.brand.text}
                        error={!erros.brand.valid}
                        name="brand"
                        id="brand"
                        label="Marca"
                        type="text"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <footer>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!allFieldsValid()}>
                            {message}
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={cancel}>
                            Cancelar
                        </Button>

                    </footer>
                </form>
            </section>
        </div>
    );
}

export default BrandRegister;