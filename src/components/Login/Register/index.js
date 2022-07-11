import React, { useState } from "react";
import Navbar from "../../Navbar";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)

  const [registerInput, setRegisterInput] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    error_list: []
  });

  const handleInput = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      phone: registerInput.phone,
      password: registerInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/register', data).then(res => {
        if (res.data.status === 200) {
          setIsLoading(false)
          swal('Sucesso', res.data.message, 'success')
          navigate('/login')
        }
        else {
          setIsLoading(false)
          setRegisterInput({ ...registerInput, error_list: res.data.validation_errors })
        }
      })
    })

  }

  return (
    <div id='home'>
      {isLoading &&
        <div className="preloader">
          <div className="preloader-inner">
            <div className="preloader-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      }
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="'col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Registro</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Nome Completo</label>
                    <input type="" name="name" onChange={handleInput} value={registerInput.name} className="form-control" />
                    <span>{registerInput.error_list.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input type="" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                    <span>{registerInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Telefone</label>
                    <input type="" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control" />
                    <span>{registerInput.error_list.phone}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Senha</label>
                    <input type="" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                    <span>{registerInput.error_list.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">Registre-se</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;