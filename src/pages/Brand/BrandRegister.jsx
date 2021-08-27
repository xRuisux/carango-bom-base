import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErrors from '../../hooks/useErrors';
import BrandService from '../../services/BrandService';
import { StyledButton, StyledTextField, useStyles } from './styles'
import FormModal from '../../components/FormModal/FormModal';
function BrandRegister() {
    const { id } = useParams();
    const classes = useStyles()
    const history = useHistory();
    const [brand, setBrand] = useState("");

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

    useEffect(() => {
        if (id) {
            BrandService.read(id)
                .then(brand => setBrand(brand.name));
        }
    }, [id]);

    return (
        <div className={classes.root}>
            <FormModal
            open = {true}
            />
            <form onSubmit={(event) => {
                event.preventDefault();
                if (allFieldsValid()) {
                    if (id) {
                        BrandService.update({ id, name: brand })
                            .then(res => {
                                history.goBack();
                            });
                    } else {
                        BrandService.create({ name: brand })
                            .then(res => {
                                setBrand("");
                                history.goBack();
                            });
                    }
                }
            }}>
                <StyledTextField
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

                <StyledButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!allFieldsValid()}>
                    {id ? 'Alterar' : 'Cadastrar'}
                </StyledButton>

                <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={cancel}>
                    Cancelar
                </StyledButton>
            </form>
        </div>
    );
}

export default BrandRegister;