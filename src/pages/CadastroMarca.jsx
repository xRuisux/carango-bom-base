import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErrors from '../hooks/useErrors';
import BrandService from '../services/BrandService';

function CadastroMarca() {

    const [marca, setMarca] = useState("");

    const history = useHistory();

    const { id } = useParams();

    const validacoes = {
        marca: dado => {
            if (dado && dado.length >= 3) {
                return { valid: true };
            } else {
                return { valid: false, text: "Marca deve ter ao menos 3 letras." }
            }
        }
    }

    const [erros, validateFields, allFieldsValid] = useErrors(validacoes);

    function cancelar() {
        history.goBack();
    }

    // TODO: Avaliar remover disable na próxima linha
    useEffect(() => {
        if (id) {
            BrandService.consultar(id)
                .then(m => setMarca(m.nome));
        }
    }, [id]); // eslint-disable-line

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (allFieldsValid()) {
                if (id) {
                    BrandService.alterar({ id, nome: marca })
                        .then(res => {
                            history.goBack();
                        });
                } else {
                    BrandService.cadastrar({ nome: marca })
                        .then(res => {
                            setMarca("");
                            history.goBack();
                        });
                }
            }
        }}>
            <TextField
                value={marca}
                onChange={evt => setMarca(evt.target.value)}
                onBlur={validateFields}
                helperText={erros.marca.text}
                error={!erros.marca.valid}
                name="marca"
                id="marca"
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
                onClick={cancelar}>
                Cancelar
            </Button>
        </form>
    );
}

export default CadastroMarca;