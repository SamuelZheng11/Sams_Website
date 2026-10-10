import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import appStore from '../AppStore';
import LandingPage from './LandingPage';

test('renders the landing page with an accessible skip link', () => {
  render(
    <Provider store={appStore}>
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText('Skip to main content')).toBeInTheDocument();
});