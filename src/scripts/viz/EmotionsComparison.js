import React from "react";
import * as d3 from "d3";

import '../../styles/emotions-comparison.css';

import { getWindowHeight } from "../utils/utils"

import source from "../../data/sentiments/by_types.json";

const visOffset = 100;


const emotions = source[0].emotions.map((e) => (e.type)).sort();

const pie = d3.pie().value((d) => 1);
const data = source.map((s) => (
		{ 
			speaker: s.speaker, 
			emotions: pie(s.emotions)
		})
	);

const colors =  {
	anger : "#B62220",
	anticipation: "#F67A22",
	disgust: "#8F4FA6",
	fear: "#1D4A6B",
	joy: "#F9BE3C",
	sadness: "#11959A",
	surprise: "#009351", 
	trust: "#03B8ED"
};

class EmotionsComparison extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			width: 100,
			height: 100
		};

		const maxFreq = d3.max(source, (d) => d3.max(d.emotions, (x) => x.freq) ); 
		const minFreq = d3.min(source, (d) => d3.min(d.emotions, (x) => x.freq) ); 

		this.scaleRadius = d3.scaleSqrt().domain([minFreq, maxFreq]).range([5, 20]);

		this.arc = d3.arc()
			.outerRadius((d) => (this.scaleRadius(d.data.freq)))
    		.innerRadius(0)
    		.cornerRadius(2);
	}

	componentDidMount() {

		const ph = d3.select(this.refs.viz);
		const height = getWindowHeight() - visOffset;
		const { width } = ph.node().getBoundingClientRect();

		this.setState({ width, height });
	}

	render() {
		const { width, height } = this.state;

		const cellHeight = height / 3;
		const cellWidth = width / 4;
		const xOffset = cellWidth / 2;
		const yOffset = cellHeight / 2;

		const maxRadius = Math.min(cellHeight, cellWidth) / 2;
		const minRadius = Math.max(10, maxRadius * 0.2);

		this.scaleRadius.range([minRadius, maxRadius]);

		return (
				<section className="emotions-comparison">
					<div className="note" ref="note">
						<div className="article">
							What is most common emotion?
							<ul>
								{ 
									emotions.map((e) => 
										(<li key={e} 
											 style={{ backgroundImage: `linear-gradient(to left, white 45%, ${colors[e]} 45%)`
										}}>{ e }</li>))
								}
							</ul>
						</div>
					</div>
					<div className="viz" ref="viz">
						<svg width={width} height={height}>
							{
								data.map((speaker, i) => {
										const x = (i % 4) * cellWidth;
										const y = (Math.floor(i / 4)) * cellHeight;
										return (
											<g key={speaker.speaker} transform={`translate(${x},${y})`}>
												<g transform={`translate(${xOffset},${yOffset})`}>
												{ 
													speaker.emotions.map((emo) => {
														const a = this.arc(emo);
														const c = colors[emo.data.type];
														return (<path key={ emo.data.type } d={a} fill={c} />)
													})
												}
												</g>
												<text dy={15} dx={10}>{speaker.speaker}</text>
											</g>
										);
									})
							}
						</svg>
					</div>
				</section>
			);
	}
}

export default EmotionsComparison;