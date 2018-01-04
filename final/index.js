"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render( 
  <App />
, document.getElementById('root') );
