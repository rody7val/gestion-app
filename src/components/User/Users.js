// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './css/Users.css';

export default class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      users: []
    }
  }

	componentWillMount() {
    fetch('http://localhost:8000/users')
      .then((response) => {
        return response.json();
      })
      .then(data => {
        this.setState({ users: data.users });
      });
  }

  render() {

    return (
    <div>
      <div className='backButton'>
        <Link to='/'>
          <i className='fa fa-arrow-left fa-3x' />
        </Link>
      </div>

      <div className='content list'>
        <h2>Proveedores</h2>
        <div className='fluid'>
        	<ul>
        		{
        			this.state.users.map(provider => {
        				return (
        					<li key={provider._id}>
                    <div className='flex'>
                      <div
                        className='avatarList'
                        style={{backgroundImage: `url(img/default-img.jpeg)`}}></div>
        						  <a href='#'>
        							 {provider.name}
        						  </a>
                    </div>
                    <hr/>
        					</li>
        				)
        			})
        		}
        	</ul>
        </div>
      </div>
      
		  <div className='footerButtons'>
      		<Link className='btn' to="/users/new">
      			<i className="fa fa-plus" />
      		</Link>
      </div>
    </div>
    );
  }
}