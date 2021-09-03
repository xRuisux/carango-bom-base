import { useEffect, useState } from "react"
import { Confirm } from "../../components/Confirm/Confirm"
import Table from "../../components/Table/Table"
import UserService from "../../services/UserService"
import { delayFunc } from "../../utils/delayFunc"

const columns = [
    { field: 'email', headerName: 'Email', width: 150 },
  ]
  
  export function UserList() {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [loading, setLoading] = useState(false)
  
    useEffect(async () => {
          const { data } = await UserService.list()
          setUsers(data ?? [])
      }, [])
    
    function onSelectRow(rowInfo) {
      if(!rowInfo) {
        setSelectedUser(undefined)
        return
      } 
      
      const { id, email } = rowInfo
    
      setSelectedUser({
        id,
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