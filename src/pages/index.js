import React from 'react';
import NotesList from '../components/notes-list';

import { Link } from 'react-router-dom';

class IndexPage extends React.PureComponent {
    constructor(props) {
        super(props);

        let notes = Object.values(props.notes)
        notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        this.state = { notes };
    }

    render() {
        let { notes } = this.state;

        if (!notes.length) {
            return (
                <div className="app-intro">
                    <h2>Welcome to ReactNotes</h2>
                    <p>You don't have any notes. <Link className="btn" to="/new">Get started!</Link></p>
                    <p>All notes you create will be stored right here, on your browser. No need to worry about logging in.</p>
                    <p>There's currently no Import/Export functionality, so you will not be able to see or share notes written using other browsers or on your phone.</p>
                    <hr/>
                    <p>This app is <a href="https://github.com/mralex/react-notes">open source</a>, built using React and PouchDB. Developed for a tutorial series on YouTube.</p>
                </div>
            );
        }

        return (
            <div>
                <h2>Notes</h2>
                <NotesList notes={this.state.notes}/>
            </div>
        )
    }
}

export default IndexPage;
