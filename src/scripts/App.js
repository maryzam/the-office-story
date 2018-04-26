import React from 'react';
import PropTypes from "prop-types"; 

import Header from "./Header";
import Footer from "./Footer";

import CharactersOverview from "./viz/CharactersOverview";
import SentimentDynamics from "./viz/SentimentDynamics";
import TopSentimentWords from "./viz/TopSentimentWords";
import EmotionsComparison from "./viz/EmotionsComparison";

class App extends React.Component {

	/*render() {
		return (
			<div className="container">
				<Header />
				<main>
					<CharactersOverview />
					<SentimentDynamics />
					<TopSentimentWords />
					<EmotionsComparison />
				</main>
				<Footer />
			</div>
		)
	}*/

	render() {
		return (
			<div className="container">
				<Header />
				<main>
					<EmotionsComparison />
					<SentimentDynamics />
				</main>
				<Footer />
			</div>
		)
	}
}

export default App;