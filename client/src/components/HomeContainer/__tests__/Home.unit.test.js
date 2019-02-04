import React from "react";
import { shallow } from "enzyme";

import HomeContainer from "../HomeContainer";

test("renders HomeContainer", () => {
   const wrapper = shallow(<HomeContainer />);
   expect(wrapper).toMatchSnapshot();
});
