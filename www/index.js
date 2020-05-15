import * as fourier from "@linanova/fourier";
import * as d3 from "d3";


const width = window.innerWidth;
const height = window.innerHeight;

const line = d3.line()
    .x(function(_, i) { return x(i) })
    .y(function(d) { return y(d) });

let svg = d3.select("#graph")
	.append("svg")
		.attr("width", width)
        .attr("height", height);

let x = d3.scaleLinear().domain([0, 512]).range([ 0, width ]);
let y = d3.scaleLinear().domain([0, 300]).range([ height/2, 0 ]);

let data;

const updateLine = () => {
    svg.select("path")
        .datum(data)
        .attr("d", line )
};

const drawLine = () => {
    svg.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "white")
		.attr("stroke-width", 2)
		.attr("d", line )
};

async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = e => {
		let raw_data = fourier.apply_fft(e.inputBuffer.getChannelData(0));

        // cut off the negative frequency part of the spectrum
        data = raw_data.slice(0, 512);

        svg.select("path").empty() ? drawLine() : updateLine();
    };
}

start()
