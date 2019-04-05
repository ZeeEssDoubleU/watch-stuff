import numeral from "numeral";

export const getAbbrevNumber = number => {
	if (number.toString().length > 1 && number.toString().length % 3 === 1) {
		return numeral(number)
			.format("0.[0]a")
			.toUpperCase();
	} else {
		return numeral(number)
			.format("0a")
			.toUpperCase();
	}
};
