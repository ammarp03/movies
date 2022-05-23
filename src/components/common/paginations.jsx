import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Paginations = (props) => {
	const { itemCounts, currentPage, pageSize, onPageChange } = props;
		const pagesCount = Math.ceil(itemCounts / pageSize);

	const pages = _.range(1, pagesCount + 1);

	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page-item"}
					>
						<a  href="#/" className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
		
	);
};

Paginations.propotypes = {
	itemCounts: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	pageSize:PropTypes.number.isRequired,
	onPageChange:PropTypes.func.isRequired,
};
export default Paginations;
