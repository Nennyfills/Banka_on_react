import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
// im

import App from '../../src/components/app';
import Login from '../../src/components/auth/login';
import SignUp from '../../src/components/auth/signup';

describe('App component', () => {
  test('renders properly', () => {
    const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);

    expect(wrapper.find('Provider')).toBeTruthy();
  });

  test('should test the login route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(Login)).toHaveLength(1);
  });

  test('should test the signup route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/signup']} initialIndex={0}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(SignUp)).toHaveLength(0);
  });
});
