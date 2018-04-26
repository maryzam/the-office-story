import React from "react";

// import data sets

class CharactersOverview extends React.Component {

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	onScroll() {

	}

	render() {

		return (
			<section>
				<div className="viz" ref="container">
					<svg ref="svg"></svg>
				</div>
				<div className="note">
					<div className="article">Top words overall</div>
					<div className="article">Top words + distinguishing words</div>
					<div className="article">Distinguishing words by characters</div>
					<div className="article">How many words per season (avg) by characters</div>
					<div className="article">Emotional words - positive/negative</div>
					<div className="article">Emotional words - % of all words</div>
				</div>
			</section>
		);
	}
}


export default CharactersOverview;