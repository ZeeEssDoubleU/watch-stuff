import React from "react";
import { shallow } from "enzyme";

import CommentsHeader from "../CommentsHeader";

describe("CommentsHeader", () => {
	test("renders with props.commentCount = null", () => {
		const wrapper = shallow(<CommentsHeader />);
		expect(wrapper).toMatchSnapshot();
	});

	test("renders with props.commentCount = 0", () => {
		const wrapper = shallow(<CommentsHeader amountComments={123} />);
		expect(wrapper).toMatchSnapshot();
	});
});
