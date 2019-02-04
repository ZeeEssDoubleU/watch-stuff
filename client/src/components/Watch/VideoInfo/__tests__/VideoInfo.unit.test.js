import React from "react";
import { shallow } from "enzyme";

import VideoInfo from "../VideoInfo";

describe("VideoInfo", () => {
	test("renders collapsed", () => {
		const wrapper = shallow(<VideoInfo />);
		expect(wrapper).toMatchSnapshot();
	});
	test("renders expanded", () => {
		const wrapper = shallow(<VideoInfo />);
		wrapper.setState({ collapsed: false });
		expect(wrapper).toMatchSnapshot();
	});
});
