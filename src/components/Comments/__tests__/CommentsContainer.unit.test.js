import React from "react";
import { shallow } from "enzyme";

import Comments from "../Comments";

describe("Comments", () => {
	test("renders without props", () => {
		const wrapper = shallow(<Comments />);
		expect(wrapper).toMatchSnapshot();
	});

	test("renders with commentCount", () => {
		const wrapper = shallow(<Comments commentCount={112499} />);
		expect(wrapper).toMatchSnapshot();
	});
});
