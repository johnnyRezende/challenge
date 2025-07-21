import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderComponent from '@/components/Header';
import '@testing-library/jest-dom';
import { mockRouterPush } from '../../jest.setup';

describe('Header component test cases', () =>
{

  afterEach(() => {
    mockRouterPush.mockRestore();
  });

  it('Should render Dashboard and List links', () =>
  {
    render(<HeaderComponent />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('List')).toBeInTheDocument();
  });


  it('Should router.push to "/" when Dashboard is clicked', () =>
  {
    render(<HeaderComponent />);

    const link = screen.getByText('Dashboard');
    fireEvent.click(link);

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  it('Should router.push to "list" when List is clicked', () =>
  {
    render(<HeaderComponent />);

    const link = screen.getByText('List');
    fireEvent.click(link);

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('list');
  });
})
