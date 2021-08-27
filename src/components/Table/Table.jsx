import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { StyledButton } from '../Button'
import { useStyles } from './styles'

export default function Table({
  rows,
  columns,
  addItem,
  updateItem,
  deleteItem,
  selectedItem,
  rowSelectedFunction,
}) {

  const classes = useStyles()

  return (
    <section className={classes.root}>
      <header>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={addItem}
        >
          Adicionar
          </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          disabled={!selectedItem}
          onClick={deleteItem}
        >
          Excluir
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          disabled={!selectedItem}
          onClick={updateItem}
        >
          Alterar
        </StyledButton>
      </header>
      <div className={classes.tableContainer}>
        <DataGrid
          className={classes.table}
          rows={rows}
          columns={columns}
          onRowSelected={(gridSelection) =>
            rowSelectedFunction(gridSelection.data)
          }
        />
      </div>
    </section>
  );
}