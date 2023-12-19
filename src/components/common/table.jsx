import React, {Component} from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component{
    render() {
        const {columns,onSort,sortColumn,movies} = this.props;
        return(
            <table className="table">
                <TableHeader
                    columns={columns}
                    onSort={onSort}
                    sortColumn={sortColumn}
                />
                <TableBody
                    data={movies}
                    columns={columns}
                />
            </table>
        )
    }
}
export default Table;