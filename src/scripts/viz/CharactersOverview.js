import React from "react";
import * as d3 from "d3";

import '../../styles/characters-overview.css';

import { getWindowHeight } from "../utils/utils";

import source from "../../data/sentiments/by_speakers.json";

const speakers = source.map((d) => (d.speaker))
const min = -d3.max(source, (d) => (d.negativeFreq));
const max = d3.max(source, (d) => (d.positiveFreq));

const visOffset = 100;
const margin = 15;

class CharactersOverview extends React.Component {

	scaleSpeakers = d3.scaleBand().domain(speakers).padding(0.1);
	scaleSentiments = d3.scaleLinear().domain([min, max]);

	componentDidMount() {
		const ph = d3.select(this.refs.viz);
		const height = getWindowHeight() - visOffset;
		const { width } = ph.node().getBoundingClientRect();

		const container = d3.select(this.refs.svg)
								.attr("width", width)
								.attr("height", height)
						.append("g")
							.attr("transform", `translate(${2*margin}, ${margin})`);

		this.scaleSpeakers.range([0, height - 2 * margin]);
		this.scaleSentiments.range([0, width - 2 * margin,]);

		const bars = container
				.selectAll("g")
			.data(source).enter()
			.append("g")
			.attr("transform", (d) => `translate(0,${this.scaleSpeakers(d.speaker)})`);

		const zeroLine = this.scaleSentiments(0);
		bars
			.append("rect")
				.attr("y", -this.scaleSpeakers.bandwidth() / 2)
				.attr("x", zeroLine)
				.attr("height", this.scaleSpeakers.bandwidth())
				.attr("width", (d) => ( this.scaleSentiments(d.positiveFreq)-zeroLine))
				.attr("rx", 5)
				.attr("ry", 5)
					.style("fill", "#CD34B5")
		bars
			.append("rect")
				.attr("y",  -this.scaleSpeakers.bandwidth() / 2)
				.attr("x", (d) => (this.scaleSentiments(-d.negativeFreq)))
				.attr("height", this.scaleSpeakers.bandwidth())
				.attr("width", (d) => ( zeroLine-this.scaleSentiments(-d.negativeFreq)))
				.attr("rx", 5)
				.attr("ry", 5)
					.style("fill", "#2c2c2c")

		bars
			.append("text")
			.text((d) => { 
				const pos = d.positiveFreq.toFixed(1);
				const neg = d.negativeFreq.toFixed(1);
				return `${neg}%  (     ${d.speaker}      ) ${pos}%`;
			})
			.attr("x", zeroLine)
			.style("fill", "white")
			.style("text-anchor", "middle");


	}

	componentDidUpdate() {

	}

	render() {

		return (
			<section className="characters-overview">
				<div className="note">
					<div className="article">
						<p>It's not a secret that all people are different.
						Our speech is a reflection of our character.</p>
						<p>But can we characterize a person by his/her talks?</p>
						<p>Let's try to do it for employees of the the Scranton branch of <span>the Dunder Mifflin Paper Company</span></p>
						<p>First of all we can find out who is the most positive person in the office</p>
						<p>Seems that it's <span>Jim</span>. Argee?</p>
					</div>
				</div>
				<div className="viz" ref="viz">
					<svg ref="svg"></svg>
				</div>
			</section>
		);
	}
}


export default CharactersOverview;