import React, { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";

function MyAccount() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)

  const [accountInput, setAccountInput] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState([])

  const handleInput = (e) => {
    e.persist();
    setAccountInput({ ...accountInput, [e.target.name]: e.target.value });
  }


  const updateSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {
      name: accountInput.name,
      email: accountInput.email,
      phone: accountInput.phone,
      password: accountInput.password,
    }


    axios.post(`/api/update-user/${accountInput.id}`, data).then(res => {
      if (res.data.status === 200) {
        setIsLoading(false)
        swal('Sucesso', res.data.message, 'success')
        navigate('/')
      }
      else {
        setIsLoading(false)
        setError(res.data.errors)
      }
    })
  }

  useEffect(() => {
    axios.get('/api/users/me').then(response => {
      setAccountInput({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        password: ''
      });
    })
  }, [])

  return (
    <div id='home'>
      {isLoading ?
        <div className="preloader">
          <div className="preloader-inner">
            <div className="preloader-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        :
        <div>
          <Navbar />
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="'col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Minha Conta</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={updateSubmit}>
                      <div className="form-group mb-3">
                        <label>Nome Completo</label>
                        <input type="" name="name" onChange={handleInput} value={accountInput.name} className="form-control" />
                        <span>{error.name}</span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Email</label>
                        <input type="" name="email" onChange={handleInput} value={accountInput.email} className="form-control" />
                        <span>{error.email}</span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Telefone</label>
                        <input type="" name="phone" onChange={handleInput} value={accountInput.phone} className="form-control" />
                        <span>{error.phone}</span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Senha</label>
                        <input type="" name="password" onChange={handleInput} value={accountInput.password} className="form-control" />
                        <span>{error.password}</span>
                      </div>
                      <div className="d-flex mb-3 justify-content-between">
                        <a className="btn btn-primary" href="/">Voltar</a>
                        <button type="submit" className="btn btn-primary">Atualizar</button>
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

export default MyAccount;