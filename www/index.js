import * as fourier from "fourier";
import * as d3 from "d3";


let width = window.innerWidth;
let height = window.innerHeight;

let svg = d3.select("#graph")
	.append("svg")
		.attr("width", width)
		.attr("height", height)
	.append("g");

let x = d3.scaleLinear().domain([0, 512]).range([ 0, width ]);
let y = d3.scaleLinear().domain([0, 300]).range([ height/2, 0 ]);

const updateChart = data => {
	d3.select("path").remove();
	svg.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "white")
		.attr("stroke-width", 2)
		.attr("d", d3.line()
			.x(function(_, i) { return x(i) })
			.y(function(d) { return y(d) })
		)
};

async function record() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = e => {
		let data = fourier.apply_fft(e.inputBuffer.getChannelData(0));
		// cut off the negative frequency part of the spectrum
		updateChart(data.slice(0, 512));
    };
}

record()
