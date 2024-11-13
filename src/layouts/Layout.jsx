import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <header>
            Header
        </header>

        <main>
            <Outlet />
        </main>

        <footer>
            Footer
        </footer>
    </>
  )
}

export default Layout