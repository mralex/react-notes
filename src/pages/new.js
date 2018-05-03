import React from 'react';
import { Link } from 'react-router-dom';

import { DBComponent } from '../context';

import "./form.css";

class NewNotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            note: {
                title: '',
                body: '',
                createdAt: null,
                updatedAt: null
            },
            saving: false
        }
    }

    async componentDidMount() {
        // let notes = await this.props.db.allDocs();

        // this.setState({ notes: notes.rows, loading: false });
    }

    async handleSave() {
        this.setState({ saving: true });

        const { note } = this.state;

        note.createdAt = new Date();
        note.updatedAt = new Date();

        const res = await this.props.db.post({ ...note });

        this.props.history.replace(`/notes/${ res.id }`)
    }

    updateValue(e) {
        let { note } = this.state;

        this.setState({ note: { ...note, [e.target.name]: e.target.value }});
    }

    render() {
        const { note } = this.state;

        return (
            <div className="note-form">
                <h1>New Note</h1>
                <form onSubmit={(e) => { e.preventDefault(); this.handleSave(); }}>
                    <div className="note-form-field">
                        <label>Title</label>
                        <input type="text" name="title" value={note.title} onChange={(e) => this.updateValue(e)} />
                    </div>
                    <div className="note-form-field">
                        <textarea name="body" value={note.body} onChange={(e) => this.updateValue(e)} />
                    </div>
                    <div className="note-form-buttons">
                        <input type="submit" value="Save" />
                        <Link to={`/`}>Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default DBComponent(NewNotePage);
