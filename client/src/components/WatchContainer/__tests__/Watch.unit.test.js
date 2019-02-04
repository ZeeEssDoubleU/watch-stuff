import React from "react";
import { shallow } from "enzyme";

import WatchContainer from "../WatchContainer";

test("renders WatchContainer", () => {
	const wrapper = shallow(<WatchContainer />);
	expect(wrapper).toMatchSnapshot();
});
