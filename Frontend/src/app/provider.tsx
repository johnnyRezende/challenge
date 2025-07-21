'use client'
import HeaderComponent from "@/components/Header"
import React from 'react';

export function Provider({children}: any)
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