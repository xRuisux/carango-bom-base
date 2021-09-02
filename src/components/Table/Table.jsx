import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button } from '../Button'
import { CircularProgress } from '@material-ui/core'
import './Table.css';

export default function Table({
  loading = false,
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
            <Button
              className="actions"
              variant="contained"
              color="primary"
              onClick={addItem}
            >
              Adicionar
              </Button>
            <Button
              className="actions"
              variant="contained"
              color="secondary"
              disabled={!selectedItem}
              onClick={deleteItem}
            >
              Excluir
            </Button>
            <Button
              className="actions"
              variant="contained"
              color="primary"
              disabled={!selectedItem}
              onClick={updateItem}
            >
              Alterar
            </Button>
          </div>
      }
      </header>

    </section>
  );
}