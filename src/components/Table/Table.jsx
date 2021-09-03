import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button, ButtonDelete, DeleteButton } from '../Button'
import { CircularProgress } from '@material-ui/core'
import './Table.css';

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
    <section>
      <header>
        <div className='tableContainer'>
          {loading 
            ?
            <div className='loading'>
              <CircularProgress />
            </div>
              : <DataGrid
                className='table'
                rows={rows}
                columns={columns}
                onRowSelected={handleRowSelection}
                state={{ selection: selectionObj }}
              />
          }
        </div>
      {
        localStorage.getItem('token') &&
          <div className="actionsBar">
            {addItem && <Button
              className="actions"
              variant="contained"
              color="primary"
              onClick={addItem}
            >
              Adicionar
              </Button>}
            {updateItem && <Button
              className="actions"
              variant="contained"
              color="secondary"
              disabled={!selectedItem}
              onClick={updateItem}
            >
              Alterar
            </Button>}
            <ButtonDelete
              className="actions"
              variant="contained"
              color="secondary"
              disabled={!selectedItem}
              onClick={deleteItem}
            >
              Excluir
            </ButtonDelete>
          </div>
      }
      </header>
    </section>
  );
}