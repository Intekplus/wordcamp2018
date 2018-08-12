import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import CreateCPT from './CreateCPT';

class CPT extends Component {
    state = {
        type: '',
        cpts: [],
    }

    componentDidMount() {
        const type = this.getCPT();
        axios.get(`/${type}?_embed&status=draft,publish`).then((response) => {
            return response.data
        })
            .then((cpts) => {
                this.setState({
                    type,
                    cpts
                });
            });
    }

    addToList = (data) => {
        let { type, cpts } = this.state;

        axios.post(`/${type}`, data)
            .then((resp) => {
                return resp.data
            }).then((newCPT) => {
                cpts = cpts.concat(newCPT);
                this.setState({
                    cpts
                });
            });
    }

    removeFromList = (rowID) => {
        let { type, cpts } = this.state;

        axios.delete(`/${type}/${rowID}`)
            .then((resp) => {
                cpts = cpts.filter((cpt) => cpt.id !== rowID);
                this.setState({ cpts });
            })
    }

    getCPT = () => {
        return this.props.location.search.split('=')[1];
    }

    render() {
        const { cpts } = this.state;
        const columns = [
            {
                Header: 'ID',
                accessor: 'id',
                Cell: props => (
                    <div className='cell-container'>
                        <a href={`/wp-admin/post.php?post=${props.value}&action=edit`}>
                            <div className='id'>{props.value}</div>
                        </a>
                    </div>
                )
            },
            {
                Header: 'Status',
                accessor: 'status',
                id: 'status',
                Filter: ({ filter, onChange }) => (
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "All"}
                    >
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
                        <option value="All">All</option>
                    </select>
                ),
                filterMethod: (filter, row) => {
                    if (filter.value === "Publish") {
                        return row.status === "publish";
                    } else if (filter.value === "Draft") {
                        return row.status === "draft";
                    }
                    return true;
                },
                Cell: props => <div className='cell-container'><div className='status'>{props.value}</div> </div>
            },
            {
                Header: 'Title',
                accessor: 'title.rendered',
                id: 'title',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["title"] }),
                filterAll: true,
                Cell: props => <div className='cell-container title'>{props.value}</div>
            },
            {
                Header: 'Thumbnail',
                id: 'thumbnail',
                accessor: '_embedded.wp:featuredmedia[0].source_url',
                filterMethod: (filter, row) => {
                    if (filter.value === "Yes") {
                        return row.thumbnail;
                    } else if (filter.value === "No") {
                        return !row.thumbnail;
                    }
                    return true;
                },
                Filter: ({ filter, onChange }) => (
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "All"}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="All">All</option>
                    </select>
                ),
                Cell: props => <img src={props.value ? props.value : ""} className='thumbnail' alt="" /> 
            },
            {
                Header: '',
                filterable: false,
                 Cell: props => <button className="delete-button" onClick={() => this.removeFromList(props.row.id)}>Trash</button> 
            }
        ];

        return (
            <div>
                <h1>React Custom post types</h1> 
                <CreateCPT
                    addToList={(newCPT) => this.addToList(newCPT)}
                />
                <ReactTable
                    className="-striped -highlight"
                    data={cpts}
                    columns={columns}
                    defaultSorted={[
                        {
                            id: "id",
                            desc: true
                        }
                    ]}
                    defaultPageSize={10}
                    filterable
                />
            </div>
        );
    }
}

export default CPT