import { useEffect, useState } from "react"
import { Confirm } from "../../components/Confirm/Confirm"
import Table from "../../components/Table/Table"
import UserService from "../../services/UserService"
import { delayFunc } from "../../utils/delayFunc"

const columns = [
    { field: 'name', headerName: 'Nome', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
  ]
  
  export function UserList() {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      async function getUsers() {
        const { data } = await UserService.list()
        setUsers(data ?? [])
      }
      
      getUsers()
    }, [])
    
    function onSelectRow(rowInfo) {
      if(!rowInfo) {
        setSelectedUser(undefined)
        return
      } 
      
      const { id, name, email } = rowInfo
    
      setSelectedUser({
        id,
        name,
        email
      })
    }
  
    function removeUserFromList(id) {
      setUsers(users.filter(user => user.id !== id))
    }
  

    async function deleteUser() {
      setLoading(true)
      const { data } = await UserService.delete(selectedUser.id ?? {})
      removeUserFromList(data.id)
  
      setIsConfirmOpen(false)
      delayFunc(() => setLoading(false))
    }
  
    const rows = users.map(user => {
      return { 
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })
    
    return (
      <section>
        <Confirm open={isConfirmOpen} message='Deseja mesmo excluir o usuário?' onConfirm={deleteUser} onCancel={() => setIsConfirmOpen(false)} />
        <Table
          loading={loading}
          rows={rows}
          columns={columns}
          rowSelectedFunction={onSelectRow}
          selectedItem={selectedUser}
          deleteItem={() => setIsConfirmOpen(true)}
        />
      </section>
    );
  }