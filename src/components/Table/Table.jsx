import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { StyledButton } from '../Button'
import { useStyles } from './styles'
import { useEffect } from 'react';

export default function Table({
  rows,
  columns,
  addItem,
  updateItem,
  deleteItem,
  selectedItem,
  rowSelectedFunction,
}) {
  
  const [selectionObj, setSelectionObj] = useState({})

  function handleRowSelection({ data }) {
    if(data.id === selectedItem?.id) {
      setSelectionObj({[selectedItem.id]: false})
      return rowSelectedFunction(undefined)
    }

    setSelectionObj({ [data.id]: true })
    rowSelectedFunction(data)
  }
  
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
          onRowSelected={handleRowSelection}
          onSelectionModelChange={param => console.log({param})}
          state={{ selection: selectionObj }}
        />
      </div>
    </section>
  );
}