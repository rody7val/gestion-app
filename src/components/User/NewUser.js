// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './css/NewUser.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      email: '',
      err_name: '',
      err_email: '',
      img: 'img/default-img.jpeg',
      ok: false
    }

    this.submit = this.submit.bind(this)
    this.inputChange = this.inputChange.bind(this)
    // this.imgUpload = this.imgUpload.bind(this)
  }

  // imgUpload = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('img', e.target.files[0]);
    
  //   fetch('http://localhost:8000/img/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     let path = data.path.replace(/\\/g, "/");

  //     this.setState({
  //       img: path.replace(/.*\/public/, '')
  //     });
  //   });
  // }

  notify = (msj) => {
    if (!("Notification" in window)) {
      alert(msj);
    }
    else if (Notification.permission === "granted") {
      new Notification(msj);
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          new Notification(msj);
        }
      });
    }
  }

  inputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(target.type);

    this.setState({
      [name]: value
    });
  }

  submit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      err_name: '',
      err_email: ''
    });

    let data = {
      user: {
        name: e.target.name.value, 
        email: e.target.email.value,
        // img: e.target.img.value
      }
    };

    fetch('http://localhost:8000/users/new', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', }
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.success) {
        this.notify('Usuario creado!');
        this.setState({ ok: true });
        return false;
      }

      for(let prop in data.errors) {
        console.log('err_' + prop, data.errors[prop].message)
        let propErr = 'err_' + prop;
        this.setState({
          [propErr]: data.errors[prop].message
        })
      }

    });
  }

  render() {

    return (
    <div>
    {
      this.state.ok ? (
        <Redirect to='/users'/>
      ) : (
        <div>
          <div className='backButton'>
            <Link to='/users'>
              <i className='fa fa-arrow-left fa-3x' />
            </Link>
          </div>
          <div className='form'>
            <h2>Nuevo Usuario</h2>
            <div className='fluidForm'>

            <div className='imgInputUpload'>
              <div
                className='avatar'
                style={{backgroundImage: `url(${this.state.img})`}}></div>
            </div>

            <form onSubmit={this.submit}>
              <div className='formGroup'>
                <label>Nombre</label>
                <input
                  name='name'
                  type='text'
                  placeholder='Campo obligatorio'
                  className='formControl'
                  value={this.state.name}
                  onChange={this.inputChange}/>
                {
                  this.state.err_name ? (
                    <small className='formText'>
                      {this.state.err_name}
                    </small>
                  ) : null
                }
              </div>

              <div className='formGroup'>
                <label>Email</label>
                <input
                  name='email'
                  type='text'
                  placeholder='Campo obligatorio'
                  className='formControl'
                  value={this.state.email}
                  onChange={this.inputChange}/>
                {
                  this.state.err_email ? (
                    <small className='formText'>
                      {this.state.err_email}
                    </small>
                  ) : null
                }
              </div>

              <div className='formFooterButtons'>
                <button className='btn'>Crear</button>
              </div>
              <br/>

            </form>
            </div>
          </div>
        </div>
      )
    }

    </div>
    );
  }
}