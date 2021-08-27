import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErrors from '../../hooks/useErrors';
import BrandService from '../../services/BrandService';
import { Button, TextField } from '@material-ui/core';

export default function FormModal({open, handleClose}) {
  
  const { id } = useParams();
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

  useEffect(() => {
      if (id) {
          BrandService.read(id)
              .then(brand => setBrand(brand.name));
      }
  }, [id]);
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className =  {{...classes}}
      >
        <form style={{backgroundColor: "white"}} onSubmit={(event) => {
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
            onClick={handleClose}>
            Cancelar
        </Button>
        </form>
      </Modal>
    </>
  );
}