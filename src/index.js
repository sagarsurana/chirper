import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import App from './App'; //so our app styling is applied second

//import and configure firebase here
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


var config = {
    apiKey: "AIzaSyC8Y0ywj-V42jYCD_z-uOkuICfRmr33euk",
    authDomain: "chirper-3709c.firebaseapp.com",
    databaseURL: "https://chirper-3709c.firebaseio.com",
    projectId: "chirper-3709c",
    storageBucket: "chirper-3709c.appspot.com",
    messagingSenderId: "656346485579"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));