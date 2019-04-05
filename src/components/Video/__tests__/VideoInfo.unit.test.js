import React from "react";
import { shallow } from "enzyme";

import VideoInfo from "../VideoInfo";
import watchDetails from "./props/watchDetails";

describe("VideoInfo", () => {
	test("renders without props", () => {
		const wrapper = shallow(<VideoInfo />);
		expect(wrapper).toMatchSnapshot();
	});
	test("renders collapsed with video prop", () => {
		const wrapper = shallow(<VideoInfo video={watchDetails} />);
		expect(wrapper).toMatchSnapshot();
	});
	test("renders expanded with video prop", () => {
		const wrapper = shallow(<VideoInfo video={watchDetails} />);
		wrapper.setState({ collapsed: false });
		expect(wrapper).toMatchSnapshot();
	});
});
