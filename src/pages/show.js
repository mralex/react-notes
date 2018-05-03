import React from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';
import dayjs from 'dayjs';

import { DBComponent } from '../context';

import "./show.css";

class ShowPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { note: {}, loading: true }
    }

    async componentDidMount() {
        let note = await this.props.db.get(this.props.match.params.id);
        this.setState({ note, loading: false });
    }

    renderDate() {
        let d = dayjs(this.state.note.updatedAt)
        return d.format("MMMM D YYYY, HH:mm")
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }

        const { note } = this.state;

        return (
            <div>
                <h1>{ note.title }</h1>
                <div className="note-created">
                    {this.renderDate()}
                    <Link className="note-edit" to={`/notes/${note._id}/edit`}>Edit</Link>
                    </div>
                <div className="note-body" dangerouslySetInnerHTML={ { __html: marked(note.body) } } />
            </div>
        )
    }
}

export default DBComponent(ShowPage);
