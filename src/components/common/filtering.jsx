import React from "react";
const Filter = (props) => {
	const { filter, textProperty, valueProperty, onItemSelect, selectedItem } =
		props;
	return (
		<ul className="list-group">
			{filter.map((page) => (
				<li
					key={page[valueProperty]}
					onClick={() => onItemSelect(page)}
					className={
						page === selectedItem ? "list-group-item active" : "list-group-item"
					}
				>
					{page[textProperty]}
				</li>
			))}
		</ul>
	);
};

Filter.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};
export default Filter;
