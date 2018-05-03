import React from 'react';

import { DBComponent } from '../context';

import NotesList from '../components/notes-list';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { notes: [], loading: true }
    }

    async componentDidMount() {
        let allNotes = await this.props.db.allDocs({ include_docs: true });

        let notes = allNotes.rows.map(n => n.doc)
        notes.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt)));
        
        this.setState({ notes, loading: false });
    }

    render() {
        return (
            <div>
                <h1>Notes ({ this.state.loading ? "Loading..." : this.state.notes.length })</h1>
                <NotesList notes={this.state.notes}/>
            </div>
        )
    }
}

export default DBComponent(IndexPage);
