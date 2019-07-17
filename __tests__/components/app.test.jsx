import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/app';

describe('App component', () => {
  it('starts with Hello Banka!! payment', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual(' Hello Banka!! payment ');
  });
});
