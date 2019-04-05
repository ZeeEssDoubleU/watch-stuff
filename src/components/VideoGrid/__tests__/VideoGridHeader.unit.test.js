import React from "react";
import { shallow } from "enzyme";

import VideoGridHeader from "../VideoGridHeader";

describe("VideoGridHeader", () => {
	test("renders without props", () => {
		const wrapper = shallow(<VideoGridHeader />);
		expect(wrapper).toMatchSnapshot();
	});

	test("renders title prop empty", () => {
		const wrapper = shallow(<VideoGridHeader title="" />);
		expect(wrapper).toMatchSnapshot();
	});

	test("renders with title prop", () => {
		const wrapper = shallow(<VideoGridHeader title={"Trending"} />);
		expect(wrapper).toMatchSnapshot();
	});
});
