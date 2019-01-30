import React from "react";
import { shallow } from "enzyme";

import RelatedVideos from "../RelatedVideos";

test("renders RelatedVideos", () => {
	const wrapper = shallow(<RelatedVideos />);
	expect(wrapper).toMatchSnapshot();
});
