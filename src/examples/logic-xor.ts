/**
 * Part of Brain.JS study materials by SweetPalma.
 * Example: Simple perceptron approximating XOR function.
 */
import { NeuralNetwork } from "brain.js";
import { validate } from "~/utils";

const net = new NeuralNetwork({
	iterations: 5000,
	activation: "sigmoid",
	binaryThresh: 0.5,
	hiddenLayers: [3],
});

const data = [
	{
		input: [0, 0],
		output: [0],
	},
	{
		input: [0, 1],
		output: [1],
	},
	{
		input: [1, 0],
		output: [1],
	},
	{
		input: [1, 1],
		output: [0],
	},
];

net.train(data);
validate(net, data).forEach((set) => {
	console.log(`XOR [${set.input}] -> [${set.expectedOutput}]`);
	console.log(`${set.isValid ? "✔" : "✕"} Actual Output: [${set.receivedOutput.map((x) => x.toFixed(3))}]`);
	console.log();
});
