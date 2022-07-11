import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Footer from '../../../layouts/admin/Footer';
import Navbar from '../../../layouts/admin/Navbar';
import Sidebar from '../../../layouts/admin/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';



function EditCategory() {
  const category_props = useParams();

  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: ''
  });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState([])

  const handleInput = (event) => {
    event.persist();
    setCategory({ ...category, [event.target.name]: event.target.value })
  }

  const updateCategory = (e) => {
    e.preventDefault();

    const data = category

    axios.put(`/api/update-category/${category_props.id}`, data).then(response => {
      if (response.data.status === 200) {
        swal('Sucesso', response.data.message, 'success')
        setError([])
        navigate('/admin/categories')
      } else if (response.data.status === 422) {
        setError(response.data.errors)
      } else if (response) {
        swal('Error', response.data.message, 'error')
        navigate('/admin/categories')
      }
    })
  }

  useEffect(() => {
    axios.get(`/api/edit-category/${category_props.id}`).then(response => {
      if (response.data.status === 200) {
        setCategory({
          name: response.data.category.name
        });
        setLoading(false)
      } else if (response.data.status === 404) {
        swal('Erro', response.data.message, 'error')
        navigate('/admin/categories')
      }
    })


  }, [])

  return (
    <div>
      {isLoading ?
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Carregando...</span>
          </div>
        </div>
        :
        <div id="layoutSidenav_content">
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="'col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Edição da Categoria</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={updateCategory}>
                      <div className="form-group mb-3">
                        <label>Nome da Categoria</label>
                        <input type="text" name='name' onChange={(event) => handleInput(event)} value={category.name} className="form-control" />
                        <small>{error.name}</small>
                        <span></span>
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary">Editar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default EditCategory;