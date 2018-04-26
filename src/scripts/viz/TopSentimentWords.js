import React from "react";

class TopSentimentWords extends React.Component {

	render() {

		return (
				<section>
					<div className="viz" ref="viz">
						<svg></svg>
					</div>
					<div className="note" ref="note">
						<div className="article">
							TopSentimentWords
						</div>
					</div>
				</section>
			);
	}
}

export default TopSentimentWords;