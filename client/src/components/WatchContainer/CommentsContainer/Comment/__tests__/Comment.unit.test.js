import React from "react";
import { shallow } from "enzyme";
import Comment from "../Comment";

describe("Comment", () => {
	test("renders collapsed", () => {
		const wrapper = shallow(<Comment />);
		expect(wrapper).toMatchSnapshot();
   });
   
   test("renders expanded", () => {
      const wrapper = shallow(<Comment />);
      wrapper.setState({ collapsed: false });
      expect(wrapper).toMatchSnapshot();
   });
});
