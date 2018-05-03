import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import DB from './db';

import Navbar from './components/navbar';

import IndexPage from './pages/index';
import NewPage from './pages/new';
import ShowPage from './pages/show';
import EditPage from './pages/edit';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    let db = new DB();
    this.state = { 
      db,
      notes: [],
      loading: true
    };
  }

  async componentDidMount() {
    const notes = await this.state.db.getAllNotes();

    this.setState({
      notes,
      loading: false
    });
  }

  async handleSave(note, method) {
    let res = await this.state.db[method](note);
    let { notes } = this.state;
    
    note._id = res.id;
    note._rev = res.rev;

    this.setState({
      notes: { ...notes, [res.id]: note }
    });

    return res;
  }

  async handleDelete(id) {
    let { notes } = this.state;
    let note = notes[id];

    if (notes[id] && window.confirm("Are you sure you want to delete this note?")) {
      await this.state.db.deleteNote(note);

      delete notes[id];
      
      this.setState({ notes });
    }
  }

  renderContent() {
    if (this.state.loading) {
      return <h2>Loading...</h2>
    }

    return (
      <div className="app-content">
        <Route exact path="/" component={(props) => <IndexPage {...props} notes={this.state.notes}/>} />
        <Route exact path="/notes/:id" component={(props) => (
          <ShowPage {...props} note={this.state.notes[props.match.params.id]} onDelete={(id) => this.handleDelete(id) }/>
          ) } />
        <Route path="/notes/:id/edit" component={(props) => (
          <EditPage {...props} note={this.state.notes[props.match.params.id]} onSave={(note) => this.handleSave(note, 'updateNote') }/>
          ) } />
        <Route path="/new" component={(props) => (
          <NewPage {...props} onSave={(note) => this.handleSave(note, 'createNote')} />
        )} />
      </div>
    );
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          { this.renderContent() }
        </div>
      </Router>
    );
  }
}

export default App;
