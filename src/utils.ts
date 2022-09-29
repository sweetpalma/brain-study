/**
 * Utility: Test if two numbers are close enough. Useful for testing results.
 * Default threshold is 0.1.
 */
import { NeuralNetwork } from "brain.js";
import { isEqual } from "lodash";

/**
 * Training input/output type.
 */
export type TrainData = Array<number> | { [key: string]: number | undefined };

/**
 * Training validation options.
 */
export interface ValidateOpts {
	threshold?: number;
}

/**
 * Training validator.
 */
export const validate = <I extends TrainData, O extends TrainData>(
	net: NeuralNetwork<any, any>,
	data: Array<{ input: I; output: O }>,
	opts: ValidateOpts = {}
) => {
	// Prepare options:
	const threshold = opts.threshold || 0.75;

	// Run individual tests:
	return data.map(({ input, output }) => {
		const receivedOutput = net.run(input) as O;
		let isValid = true;
		for (const key in output) {
			const a = receivedOutput[key] as unknown as number;
			const b = output[key] as unknown as number;
			if (Math.abs(a - b) > threshold) {
				isValid = false;
			}
		}
		return {
			input,
			expectedOutput: output,
			receivedOutput,
			isValid,
		};
	});
};
