import { getFormattedDuration } from "../format-time";

describe("date-format ISO8601", () => {
	test("parse 4 seconds ISO8601 video duration string ", () => {
		expect(getFormattedDuration("PT4S")).toEqual("0:04");
	});

	test("parse 13 seconds ISO8601 video duration string", () => {
		expect(getFormattedDuration("PT13S")).toEqual("0:13");
	});

	test("parse 01:00 min ISO8601 video duration string", () => {
		expect(getFormattedDuration("PT1M")).toEqual("1:00");
	});

	test("parse 1:31 min ISO8601 video duration string", () => {
		expect(getFormattedDuration("PT1M31S")).toEqual("1:31");
	});

	test("parse 10:10 min ISO8601 video duration string", () => {
		expect(getFormattedDuration("PT10M10S")).toEqual("10:10");
	});

	test("parse 03:06:15 hours ISO8601 video duration string", () => {
		expect(getFormattedDuration("PT3H6M15S")).toEqual("3:06:15");
	});

	test("parse 13:30:47 hours ISO8601 video duration string", () => {
		expect(getFormattedDuration("PT13H30M47S")).toEqual("13:30:47");
	});

	test("parse 01:00:25:05 hours ISO8601 video duration string", () => {
		expect(getFormattedDuration("P1DT25M5S")).toEqual("24:25:05");
	});

	test("parse 14:12:25:05 hours ISO8601 video duration string", () => {
		expect(getFormattedDuration("P14DT12H25M5S")).toEqual("348:25:05");
	});
});
