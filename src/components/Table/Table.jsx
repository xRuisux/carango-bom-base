import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button, ButtonDelete } from '../Button'
import { CircularProgress } from '@material-ui/core'
import s from './Table.module.css';

export default function Table({
  loading = false,
  rows,
  columns,
  addItem = null,
  updateItem = null,
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
  
  return (
    <section className={s.container}>
      <header>
        <div className={s.tableContainer}>
          {loading 
            ?
            <div className={s.loading}>
              <CircularProgress />
            </div>
              : <DataGrid
                className={s.table}
                rows={rows}
                columns={columns}
                onRowSelected={handleRowSelection}
                state={{ selection: selectionObj }}
              />
          }
        </div>
      </header>
      {
        localStorage.getItem('token') &&
          <div className={s.actionsBar}>
            {addItem && <Button
              className={s.actions}
              variant="contained"
              color="primary"
              onClick={addItem}
            >
              Adicionar
              </Button>}
            {updateItem && <Button
              className={s.actions}
              variant="contained"
              color="secondary"
              disabled={!selectedItem}
              onClick={updateItem}
            >
              Alterar
            </Button>}
            <ButtonDelete
              className={s.actions}
              variant="contained"
              color="secondary"
              disabled={!selectedItem}
              onClick={deleteItem}
            >
              Excluir
            </ButtonDelete>
          </div>
      }
    </section>
  );
}