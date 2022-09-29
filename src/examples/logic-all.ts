/**
 * Part of Brain.JS study materials by SweetPalma.
 * Example: Simple perceptron approximating some basic logical operators (OR, AND, XOR).
 */
import { NeuralNetwork } from "brain.js";
import { TrainData, validate } from "~/utils";

const net = new NeuralNetwork({
	iterations: 5000,
	activation: "sigmoid",
	binaryThresh: 0.5,
	hiddenLayers: [3],
});

enum LogicalOperator {
	OR = 0,
	AND = 1,
	XOR = 2,
}

const data = [
	// OR:
	{
		input: { operator: LogicalOperator.OR, a: 0, b: 0 },
		output: [0],
	},
	{
		input: { operator: LogicalOperator.OR, a: 1, b: 0 },
		output: [1],
	},
	{
		input: { operator: LogicalOperator.OR, a: 0, b: 1 },
		output: [1],
	},
	{
		input: { operator: LogicalOperator.OR, a: 1, b: 1 },
		output: [1],
	},

	// AND:
	{
		input: { operator: LogicalOperator.AND, a: 0, b: 0 },
		output: [0],
	},
	{
		input: { operator: LogicalOperator.AND, a: 1, b: 0 },
		output: [0],
	},
	{
		input: { operator: LogicalOperator.AND, a: 0, b: 1 },
		output: [0],
	},
	{
		input: { operator: LogicalOperator.AND, a: 1, b: 1 },
		output: [1],
	},

	// XOR:
	{
		input: { operator: LogicalOperator.XOR, a: 0, b: 0 },
		output: [0],
	},
	{
		input: { operator: LogicalOperator.XOR, a: 1, b: 0 },
		output: [1],
	},
	{
		input: { operator: LogicalOperator.XOR, a: 0, b: 1 },
		output: [1],
	},
	{
		input: { operator: LogicalOperator.XOR, a: 1, b: 1 },
		output: [0],
	},
];

net.train(data);
validate(net, data).forEach((set) => {
	const operatorName = LogicalOperator[set.input.operator];
	console.log(`${operatorName} [${set.input.a}, ${set.input.b}] -> [${set.expectedOutput}]`);
	console.log(`${set.isValid ? "✔" : "✕"} Output: [${set.receivedOutput.map((x) => x.toFixed(3))}]`);
	console.log();
});
