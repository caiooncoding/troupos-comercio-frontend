import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/admin/Navbar';
import Sidebar from '../../layouts/admin/Sidebar';
import Footer from '../../layouts/admin/Footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import axios from "axios";
import swal from 'sweetalert';


const Users = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const getUsers = () => {
    axios.get('/api/index').then(res => {
      setUsers(res.data)
      setLoading(false)
    })
  }

  const deleteUser = (event, id) => {
    event.preventDefault()

    const clickedUser = event.currentTarget
    clickedUser.innerText = "Deletando"

    axios.delete(`/api/delete-user/${id}`).then(response => {
      if (response.data.status === 200) {
        swal('Sucesso', response.data.message, 'success')
        clickedUser.closest('tr').remove()
      } else if (response.data.status === 404) {
        swal('Error', response.data.message, 'error')
      }
    })
  }


  useEffect(() => {
    getUsers()
  }, [])

  return (

    <main>

      <div>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Nome</th>
              <th scope="row">Email</th>
              <th scope="row">Telefone</th>
            </tr>
            {loading &&
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td><button onClick={(event) => deleteUser(event, user.id)} className="btn btn-danger btn-sm">Deletar</button></td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>

    </main>

  )
}

export default Users;