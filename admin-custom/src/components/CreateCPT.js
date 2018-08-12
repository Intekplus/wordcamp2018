import React, { Component } from 'react';

class CreateCPT extends Component {
    state = {
        title: "",
        publish: false,
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const status = this.state.publish ? 'publish' : 'draft';

        const data = {
            title,
            status
        }

        this.props.addToList(data);

        this.reset();
    }

    reset = () => {
        this.setState({
            title: '',
            publish: false,
        });
    }

    render() {
        return (
            <div>
                <h2>Add new custom post type</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="title"
                        placeholder="Enter title here"
                        type="text"
                        autoComplete="off"
                        value={this.state.title}
                        onChange={this.handleInputChange} />
                    <br />
                    <label>
                        Publish:
                        <input
                            name="publish"
                            type="checkbox"
                            checked={this.state.publish}
                            onChange={this.handleInputChange} />
                    </label>
                    <input className="add-new-button" type="submit" value="Add new" />
                </form>
            </div>
        );
    }
}

export default CreateCPT;