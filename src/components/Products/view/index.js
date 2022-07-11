import React, { useEffect, useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";


function ViewProduct() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  const goToAddProduct = () => {
    navigate('/admin/add-product')
  }

  const editProduct = (id) => {
    navigate(`/admin/edit-product/${id}`)
  }

  const deleteProduct = (event, id) => {
    event.preventDefault();

    const clickedProduct = event.currentTarget
    clickedProduct.innerText = "Deletando"

    axios.delete(`/api/delete-product/${id}`).then(response => {
      if(response.data.status === 200){
        swal('Sucesso', response.data.message, "success")
        clickedProduct.closest('tr').remove()
      } else if (response.data.status === 404) {
        swal('Error', response.data.message, 'error')
      }
    })

  }

  useEffect(() => {
    axios.get('/api/view-product').then(response => {
      if (response.data.status === 200) {
        setProducts(response.data.products)
        setLoading(false)
      }
    })
  }, [])

  return (
    <div className='sb-nav-fixed'>
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>


        <div id="layoutSidenav_content">
          <div className="card px-4 mt-3">
            <div className="card-header">
              <h3> Ver Produtos
                <button className="btn btn-primary btn-sm float-end" onClick={goToAddProduct}>Adicionar Produto</button>
              </h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Categoria</th>
                      <th>Nome do Produto</th>
                      <th>Preço de Venda</th>
                      <th>Imagem</th>
                      <th>Editar</th>
                      <th>Deletar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading &&
                      <div class="text-center">
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    }
                    {products.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.category_id}</td>
                          <td>{product.name}</td>
                          <td>{product.selling_price}</td>
                          <td><img src={`${process.env.REACT_APP_API}/${product.image}`} width="50px" alt="imagem"></img></td>
                          <td><button className="btn btn-success btn-sm" onClick={() => editProduct(product.id)}>Editar</button></td>
                          <td><button className="btn btn-danger btn-sm" onClick={(e) => deleteProduct(e, product.id)}>Deletar</button></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </div>

      </div>
    </div>
  )
}

export default ViewProduct;