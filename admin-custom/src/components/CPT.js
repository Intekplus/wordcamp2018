import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import matchSorter from 'match-sorter'

class CPT extends Component {
    state = {
        cpts: [],
    }

    componentDidMount() {
        axios.get(`/item?_embed&status=draft,publish`).then((response) => {
            return response.data
        })
            .then((cpts) => {
                this.setState({
                    cpts
                });
            });
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
                Cell: props => <div className='cell-container'>{props.value}</div>
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
                Cell: props => <img src={props.value} className='thumbnail' alt="" />
            }
        ];

        return (
            <ReactTable
                className="-striped -highlight"
                data={cpts}
                defaultPageSize={10}
                columns={columns}
                filterable
            />
        );
    }
}

export default CPT