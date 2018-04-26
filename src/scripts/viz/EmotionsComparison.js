import React from "react";

class EmotionsComparison extends React.Component {

	render() {

		return (
				<section>
					<div className="viz" ref="viz">
						<svg></svg>
					</div>
					<div className="note" ref="note">
						<div className="article">
							Top Positive/Negative Words by Character
						</div>
						<div className="article">
							Basic Character's Emotions
						</div>
					</div>
				</section>
			);
	}
}

export default EmotionsComparison;