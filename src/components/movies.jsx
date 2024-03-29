import React, {Component} from "react";
import {getMovies} from "../services/fakeMovieService";
import Pagination from './common/pagination';
import ListGroup from './common/listGroup'
import {paginate} from "../utils/paginate";
import {getGenres} from '../services/fakeGenreService';
import MoviesTable from "./moviesTable";
import _ from 'lodash';
class Movies extends Component{
    state = {
        movies:[],
        genres:[],
        currentPage:1,
        pageSize:4,
        sortColumn:{path:'title',order:'asc'}
    }
    componentDidMount() {
        //Want to make sure call API services success and get data.
        const genres = [{_id:"",name:"All Genres"},...getGenres()]
        this.setState({movies:getMovies(), genres});
    }

    handleDelete = id=>{
        this.setState({movies:this.state.movies.filter(movie => movie._id!==id)})
    }
    handleLike = movie=>{
        const movies= [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked=!movies[index].liked;
        this.setState({movies});
    }
    handlePageChange = page =>{
        this.setState({currentPage:page});
    }
    handleGenreSelect = genre=>{
        this.setState({selectedGenre:genre,currentPage:1});
    }

    handleSort = sortColumn=>{
        this.setState({sortColumn});
    }
    getPagedData=()=>{
        const {currentPage
            ,pageSize
            ,movies:allMovies
            ,selectedGenre
            ,sortColumn} = this.state;

        const filtered = selectedGenre && selectedGenre._id
            ?allMovies.filter(m=> m.genre._id === selectedGenre._id)
            :allMovies;
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return{totalCount:filtered.length, movies};
    }
    render(){
        const {length:count}=this.state.movies;
        const {currentPage
            ,pageSize
            ,genres
            ,selectedGenre
            ,sortColumn} = this.state;

        if(count===0) return <p>There are no movies in the database.</p>;
        let {totalCount,movies} = this.getPagedData();
        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className='col'>
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort = {this.handleSort}
                    />

                    <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange = {this.handlePageChange}/>
                </div>
            </div>
        );
    }
}
export default Movies;