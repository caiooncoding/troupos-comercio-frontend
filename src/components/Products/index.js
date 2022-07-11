import React, { useEffect, useState } from 'react';
import Navbar from '../../layouts/admin/Navbar';
import Sidebar from '../../layouts/admin/Sidebar';
import Footer from '../../layouts/admin/Footer';
import axios from 'axios';
import swal from 'sweetalert';

const Products = () => {

  const [categories, setCategories] = useState([])
  const [productInput, setProductInput] = useState({
    category_id: '',
    name: '',
    description: '',

    selling_price: '',
    original_price: '',
    brand: '',
  })
  const [image, setImage] = useState([])
  const [errors, setError] = useState([])
  const [loading, setLoading] = useState(false)


  const handleInput = (event) => {
    event.persist();
    setProductInput({ ...productInput, [event.target.name]: event.target.value })
  }

  const handleImage = (event) => {
    setImage({ image: event.target.files[0] })
  }

  const submitProduct = (event) => {
    event.preventDefault();
    setLoading(true)

    const formData = new FormData();

    const element = document.getElementsByName('category_id')

    console.log(element)

    formData.append('image', image.image)
    formData.append('category_id', productInput.category_id)
    formData.append('name', productInput.name)
    formData.append('description', productInput.description)

    formData.append('selling_price', productInput.selling_price)
    formData.append('original_price', productInput.original_price)
    formData.append('brand', productInput.brand)

    axios.post(`api/product`, formData).then(response => {
      if (response.data.status === 200) {
        setLoading(false)
        swal('Sucesso', response.data.message, "success")

        setProductInput({
          ...productInput,
          category_id: '',
          name: '',
          description: '',

          selling_price: '',
          original_price: '',
          brand: '',
        })
        setError([])
      } else if (response.data.status === 422) {
        setLoading(false)
        swal("Preencha todos os campos obrigatórios", "", "error")
        setError(response.data.errors)
      }
    })
  }

  const getCategories = () => {
    axios.get('/api/category/show').then(res => {
      setCategories(res.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className='sb-nav-fixed'>
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>


        <div id="layoutSidenav_content">
          <main>
            <div className='container-fluid px-4'>
              <div className='card mt-4'>
                <div className='card-header'>
                  <h4>
                    Adicionar Produto
                  </h4>
                </div>

                <div className='card-body'>
                  <form onSubmit={submitProduct} encType='multipart/form-data'>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Informações Básicas</button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Informações Complementares</button>
                      </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">

                      <div class="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                        <div className='form-group mb-3'>
                          <label>Selecione uma Categoria</label>
                          <select name='category_id' onChange={handleInput} value={productInput.category_id} className='form-control'>
                            <option>Selecione uma Categoria</option>
                            {
                              categories.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>{item.name}</option>
                                )
                              })
                            }
                          </select>
                          <small className='text-danger'>{errors.category_id}</small>
                        </div>

                        <div className='form-group mb-3'>
                          <label>Nome</label>
                          <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                          <small className='text-danger'>{errors.name}</small>
                        </div>

                        <div className='form-group mb-3'>
                          <label>Descrição</label>
                          <textarea type="text" name="description" onChange={handleInput} value={productInput.description} className="form-control" />
                        </div>
                      </div>

                      <div class="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                        <div className='row'>
                          <div className='col-md-4 form-group mb-3'>
                            <label>Preço de Venda</label>
                            <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className='form-control' />
                            <small className='text-danger'>{errors.selling_price}</small>
                          </div>
                          <div className='col-md-4 form-group mb-3'>
                            <label>Preço Original</label>
                            <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className='form-control' />
                            <small className='text-danger'>{errors.original_price}</small>
                          </div>

                          <div className='col-md-4 form-group mb-3'>
                            <label>Marca</label>
                            <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className='form-control' />
                            <small className='text-danger'>{errors.brand}</small>

                          </div>
                          <div className='col-md-12 form-group'>
                            <label>Imagem</label>
                            <input type="file" name="image" onChange={handleImage} className='form-control' />
                            <small className='text-danger'>{errors.image}</small>
                          </div>
                        </div>
                      </div>

                    </div>
                    {loading ?
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                      :
                      <button type='submit' className='btn btn-primary px-4 mt-2'>Adicionar Produto</button>
                    }
                  </form>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

      </div>
    </div>
  )
}

export default Products;