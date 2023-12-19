import React, {Component} from 'react';
import Like from "./common/like";
import Table from "./common/table";
class MoviesTable extends Component{
    columns=[
        {path:"title",label:"Title"},
        {path:"genre.name",label:"Genre"},
        {path:"numberInStock",label:"Stock"},
        {path:"dailyRentalRate",label:"Rate"},
        {key:"like", content: item => <Like liked={item.liked} onClick={() => this.props.onLike(item)}/>},
        {key: "delete", content: item => <button onClick={() => this.props.onDelete(item._id)} className='btn btn-danger btn-sm'>Delete</button>}
    ]
    render() {
        const {movies,sortColumn,onSort} = this.props;
        return (
            <Table columns={this.columns}
                   onSort={onSort}
                   sortColumn={sortColumn}
                   movies={movies}
            />
        )
    }
}

export default MoviesTable;