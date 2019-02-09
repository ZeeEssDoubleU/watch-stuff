import React from "react";
import { shallow } from "enzyme";

import CommentsContainer from "../CommentsContainer";

describe("CommentsContainer", () => {
	test("renders without props", () => {
		const wrapper = shallow(<CommentsContainer />);
		expect(wrapper).toMatchSnapshot();
	});

	test("renders with commentCount", () => {
		const wrapper = shallow(<CommentsContainer commentCount={112499} />);
		expect(wrapper).toMatchSnapshot();
	});
});
