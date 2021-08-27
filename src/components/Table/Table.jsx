import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import './Table.css';

export default function Table({
  rows,
  columns,
  addItem,
  updateItem,
  deleteItem,
  selectedItem,
  rowSelectedFunction,
}) {

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowSelected={(gridSelection) =>
          rowSelectedFunction(gridSelection.data)
        }
      />
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
    </>
  );
}