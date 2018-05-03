import React from 'react';
import NotesList from '../components/notes-list';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        let notes = Object.values(props.notes)
        notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        this.state = { notes };
    }

    render() {
        return (
            <div>
                <h1>Notes</h1>
                <NotesList notes={this.state.notes}/>
            </div>
        )
    }
}

export default IndexPage;
