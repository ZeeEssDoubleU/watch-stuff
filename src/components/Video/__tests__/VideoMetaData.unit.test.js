import React from "react";
import { shallow } from "enzyme";

import VideoMetadata from "../VideoMetadata";
import watchDetails from "./props/watchDetails";

describe("VideoMetadata", () => {
	test("renders without props", () => {
		const wrapper = shallow(<VideoMetadata />);
		expect(wrapper).toMatchSnapshot();
	});
	test("renders with video prop", () => {
		const wrapper = shallow(<VideoMetadata video={watchDetails} />);
		expect(wrapper).toMatchSnapshot();
	});
});
