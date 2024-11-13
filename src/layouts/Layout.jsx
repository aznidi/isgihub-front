import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


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