import React from 'react';
import { Link } from 'react-router-dom';

import "./form.css";

class EditNotePage extends React.PureComponent {
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
        this.setState({ note: {...this.props.note} });
    }

    async handleSave() {
        this.setState({ saving: true });

        const res = await this.props.onSave({ ...this.state.note });

        this.props.history.replace(`/notes/${res.id}`)
    }

    updateValue(e) {
        let { note } = this.state;

        this.setState({ note: { ...note, [e.target.name]: e.target.value } });
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }

        const { note } = this.state;

        return (
            <div className="note-form">
                <h1>Edit Note</h1>
                <form onSubmit={(e) => { e.preventDefault(); this.handleSave(); }}>
                    <div className="note-form-field">
                        <label>Title</label>
                        <input type="text" name="title" value={note.title} onChange={(e) => this.updateValue(e)} />
                    </div>
                    <div className="note-form-field note-form-field-text">
                        <textarea name="body" value={note.body} onChange={(e) => this.updateValue(e)} />
                    </div>
                    <div className="note-form-buttons">
                        <input type="submit" value="Save" />
                        <Link to={`/notes/${note._id}`}>Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditNotePage;
