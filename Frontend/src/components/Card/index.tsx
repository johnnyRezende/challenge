import "./Card.css"
import React from 'react';

export default function Card({
  title,
  children,
  id = '',
}: {
  title: string;
  children: React.ReactNode;
  id?: string
})
{
  if (!children) {
    throw new Error('Card component requires at least one child element');
  }

  return (
    <div id={id} className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
