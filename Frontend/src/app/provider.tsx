'use client'
import HeaderComponent from "@/components/Header"
import React, {type ReactNode} from 'react';

type ProviderProps = {
  children: ReactNode;
};

export function Provider({children}: ProviderProps)
{
  return (
    <div className="page-layout">
      <header className="site-header">
        <h4>Frontend Test in NextJS</h4>
      </header>
      <div className="main-container">
        <HeaderComponent/>
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}