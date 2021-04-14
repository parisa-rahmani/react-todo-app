import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Toolbar from './Toolbar';

configure({ adapter: new Adapter() });

describe('<Toolbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Toolbar />);
  });

  it('should render 1 link when user is unauthenticated', () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });

  it('should render 2 link when user is authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
});
