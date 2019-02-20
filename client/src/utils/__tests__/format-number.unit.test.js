import { getAbbrevNumber } from "../format-number";

test("getAbbrevNumber(0)", () => {
	expect(getAbbrevNumber(0)).toEqual("0");
});

test("getAbbrevNumber(9)", () => {
	expect(getAbbrevNumber(9)).toEqual("9");
});

test("getAbbrevNumber(52)", () => {
	expect(getAbbrevNumber(52)).toEqual("52");
});

test("getAbbrevNumber(456)", () => {
	expect(getAbbrevNumber(456)).toEqual("456");
});

test("getAbbrevNumber(1001)", () => {
	expect(getAbbrevNumber(1001)).toEqual("1K");
});

test("getAbbrevNumber(1099)", () => {
	expect(getAbbrevNumber(1099)).toEqual("1.1K");
});

test("getAbbrevNumber(5298)", () => {
	expect(getAbbrevNumber(5298)).toEqual("5.3K");
});

test("getAbbrevNumber(10053)", () => {
	expect(getAbbrevNumber(10053)).toEqual("10K");
});

test("getAbbrevNumber(10100)", () => {
	expect(getAbbrevNumber(10100)).toEqual("10K");
});

test("getAbbrevNumber(10999)", () => {
	expect(getAbbrevNumber(10999)).toEqual("11K");
});

test("getAbbrevNumber(11732)", () => {
	expect(getAbbrevNumber(11732)).toEqual("12K");
});

test("getAbbrevNumber(100000)", () => {
	expect(getAbbrevNumber(100000)).toEqual("100K");
});

test("getAbbrevNumber(532000)", () => {
	expect(getAbbrevNumber(532000)).toEqual("532K");
});

test("getAbbrevNumber(1000000)", () => {
	expect(getAbbrevNumber(1000000)).toEqual("1M");
});

test("getAbbrevNumber(1230000)", () => {
	expect(getAbbrevNumber(1230000)).toEqual("1.2M");
});

test("getAbbrevNumber(23000000)", () => {
	expect(getAbbrevNumber(23000000)).toEqual("23M");
});

test("getAbbrevNumber(872000000)", () => {
	expect(getAbbrevNumber(872000000)).toEqual("872M");
});

test("getAbbrevNumber(1000000000)", () => {
	expect(getAbbrevNumber(1000000000)).toEqual("1B");
});

test("getAbbrevNumber(1500000000)", () => {
	expect(getAbbrevNumber(1500000000)).toEqual("1.5B");
});

test("getAbbrevNumber(20000000000)", () => {
	expect(getAbbrevNumber(20000000000)).toEqual("20B");
});

test("getAbbrevNumber(387000000000)", () => {
	expect(getAbbrevNumber(387000000000)).toEqual("387B");
});

test("getAbbrevNumber(1000000000000)", () => {
	expect(getAbbrevNumber(1000000000000)).toEqual("1T");
});

test("getAbbrevNumber(1800000000000)", () => {
	expect(getAbbrevNumber(1800000000000)).toEqual("1.8T");
});
