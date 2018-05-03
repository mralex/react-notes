import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PouchDB from 'pouchdb';

import Navbar from './components/navbar';

import IndexPage from './pages/index';
import NewPage from './pages/new';
import ShowPage from './pages/show';
import EditPage from './pages/edit';

import './App.css';

import DBContext from './context';

class App extends Component {
  constructor(props) {
    super(props);

    let db = new PouchDB('react-notes');
    this.state = { db };
  }

  render() {
    const { db } = this.state;

    return (
      <DBContext.Provider value={db}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="app-content">
              <Route exact path="/" component={IndexPage}/>
              <Route exact path="/notes/:id" component={ShowPage}/>
              <Route path="/notes/:id/edit" component={EditPage}/>
              <Route path="/new" component={NewPage}/>
            </div>
          </div>
        </Router>
      </DBContext.Provider>
    );
  }
}

export default App;
