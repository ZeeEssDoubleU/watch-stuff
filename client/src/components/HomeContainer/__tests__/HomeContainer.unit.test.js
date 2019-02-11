import React from "react";
import { shallow } from "enzyme";

import HomeContainer from "../HomeContainer";

describe('HomeContainer', () => {
   test("renders", () => {
      const wrapper = shallow(<HomeContainer />);
      expect(wrapper).toMatchSnapshot();
   });
})

