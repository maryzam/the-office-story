import React from 'react';
import PropTypes from "prop-types"; 

import Header from "./Header";
import Footer from "./Footer";

import CharacterOverview from "./viz/CharacterOverview";
import SentimentDynamics from "./viz/SentimentDynamics";
import EmotionsComparison from "./viz/EmotionsComparison";

class App extends React.Component {

	state = {

	}

	render() {
		return (
			<div className="container">
				<Header />
				<main>
					<CharacterOverview />
					<SentimentDynamics />
					<EmotionsComparison />
				</main>
				<Footer />
			</div>
		)
	}
}

export default App;