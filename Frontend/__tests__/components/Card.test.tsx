import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@/components/Card';
import '@testing-library/jest-dom';

describe('Card component test cases', () =>
{
  it('Should render a card component with h3 element for title and a child element', () =>
  {
    render(
      <Card title="Title here">
        <h1>Child element</h1>
      </Card>
    );

    // Assert h3 title
    const cardTitle = screen.getByRole('heading', { name: 'Title here' })
    expect(cardTitle).toBeInTheDocument();

    // Assert child element
    const childElement = screen.getByText('Child element')
    expect(childElement).toBeInTheDocument();

    // Check if the card container includes the child
    const card = screen.getByRole('heading', { name: 'Child element' });
    expect(card).toContainElement(screen.getByText('Child element'));

  });

  it('Should throw an error if no child is provided', () =>
  {
    expect(() => render(<Card title="Title here" children={undefined} />)).toThrow(
      'Card component requires at least one child element'
    );
  })

  it("Should check if css className 'card' is applied to the card component", () =>
  {
    render(
      <Card title="Title here">
        <h1>Child element</h1>
      </Card>
    );

    const container = screen.getByText("Title here").parentElement;
    expect(container).toHaveClass("card");
  });

});