type TOverloadArguments = Function | [object, Function];

function overload() {
	const args: Array<TOverloadArguments> = Array.from<TOverloadArguments>(arguments);
	let functions: Array<TOverloadArguments> = [];

	for (let i = 0; i !== args.length; i++) {
		if (typeof (args[i]) === 'function') {
			functions[args[i].length] = args[i];
		}

		if (args[i] instanceof Array) {
			const argArr = args[i];

			if (argArr[0] instanceof Object && argArr[1] instanceof Function) {
				functions[args[i][1].length] = args[i];
			}
		}

		/*		if (typeof (args[i]) === 'function') {
			functions[args[i].length] = args[i];
		}*/
	}

	return function () {
		const callElement = functions[arguments.length];

		if (callElement instanceof Function) {
			functions[arguments.length]?.apply(this, arguments)
		} else if (callElement instanceof Array) {
			const typesOfCallElement = Object.values(callElement[0]);
			let call = false;

			const matchingTypes = Array.from(arguments).map((arg, idx) => {
				if (typeof typesOfCallElement[idx] !== 'string')
					console.log(new SyntaxError('Type must be a string!'))
					return;

				return typeof (arg) === typesOfCallElement[idx].toLowerCase() ? '1' : '0';
			})
				.find((i: string) => i === "0");

			if (matchingTypes == undefined) {
				functions[arguments.length][1].apply(this, arguments)
			} else {
				console.error(SyntaxError(`You have a mistake in your arguments type!`));
			}
		}
	}
}
