import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/admin/Navbar';
import Sidebar from '../../layouts/admin/Sidebar';
import Footer from '../../layouts/admin/Footer';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';


const Categories = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true)

  const [categories, setCategories] = useState([])

  const [category, setCategory] = useState({
    name: '',
    error_list: []
  });

  const getCategories = () => {
    axios.get('/api/category/show').then(res => {
      setCategories(res.data)
      setIsLoading(false)
    })
  }

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const createCategory = (e) => {
    e.preventDefault();
    const data = {
      name: category.name
    }
    axios.post('/api/category/register', data).then(res => {
      if (res.data.status === 200) {
        setIsLoading(false)
        swal('Sucesso', res.data.message, 'success')
        getCategories()
      }
      else {
        setIsLoading(false)
        setCategory({ ...category, error_list: res.data.validation_errors })
      }
    })
  }

  const editCategory = (id) => {
    navigate(`/admin/edit-category/${id}`)
  }

  const deleteCategory = (event, id) => {
    event.preventDefault();

    const clickedCategory = event.currentTarget
    clickedCategory.innerText = "Deletando"

    axios.delete(`/api/delete-category/${id}`).then(response => {
      if (response.data.status === 200) {
        swal('Sucesso', response.data.message, "success")
        clickedCategory.closest('tr').remove()
      } else if (response.data.status === 404) {
        swal('Error', response.data.message, 'error')
      }
    })

  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="'col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Criação da Categoria</h4>
              </div>
              <div className="card-body">
                <form onSubmit={createCategory}>
                  <div className="form-group mb-3">
                    <label>Nome da Categoria</label>
                    <input type="" name="name" onChange={handleInput} value={category.name} className="form-control" />
                    <span></span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">Criar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <table className="table m-auto">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              <div class="text-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            }
            {categories.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td><button className="btn btn-success btn-sm" onClick={() => editCategory(category.id)} >Editar</button></td>
                  <td><button className="btn btn-danger btn-sm" onClick={(event) => deleteCategory(event, category.id)}>Deletar</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Categories;