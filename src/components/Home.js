// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className="container">
          <h2>Home</h2>
          <Link to="/users">Usuarios</Link>
        </div>
      </div>
    );
  }
}