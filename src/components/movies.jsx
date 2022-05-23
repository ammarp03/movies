import _ from "lodash";
import React, { Component } from "react";
import MoviesTable from "./common/movieTable";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../pdn/paginate";
import Filter from "./common/filtering";
import Paginations from "./common/paginations";
import { getGenres } from "../services/fakeGenreService";
class Movies extends Component {
	state = {
		movies: [],
		pageSize: 4,
		currentPage: 1,

		genres: [],
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleOnClick = (movie) => {
		this.setState({ selectedGenre: movie, currentPage: 1 });
	};
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	render() {
		const {
			currentPage,
			pageSize,
			sortColumn,
			movies: allMovies,
			selectedGenre,
		} = this.state;
		const { length: count } = this.state.movies;
		// const count = this.state.movies.length;

		if (count === 0) return <p>There are no movies in the database.</p>;
		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

	 	const movies = paginate(sorted, currentPage, pageSize);

		return (
			<React.Fragment>
				<Filter
					filter={this.state.genres}
					onItemSelect={this.handleOnClick}
					selectedItem={this.state.selectedGenre}
				/>
				<p>Showing {filtered.length} movies in the database.</p>
				<MoviesTable
					movies={movies}
					sortColumn={sortColumn}
					onLike={this.handleLike}
					onDelete={this.handleDelete}
					onSort={this.handleSort}
				/>
				<Paginations
					itemCounts={filtered.length}
					currentPage={currentPage}
					pageSize={pageSize}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
