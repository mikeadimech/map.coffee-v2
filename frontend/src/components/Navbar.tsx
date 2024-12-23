"use client";

import { useState } from "react";
import { Link } from "react-router-dom"; // React Router Link
import { useTheme } from "next-themes";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <svg
          className="w-8 h-8 mr-2"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
        <span className="text-xl font-bold">map.coffee</span>
      </Link>

      {/* Navigation Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about" className={navigationMenuTriggerStyle()}>
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Theme Toggle and Drawer */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative w-9 h-9"
        >
          <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Login and Sign Up */}
        <Button variant="ghost" asChild className="hidden md:inline-flex">
          <Link to="/login">Login</Link>
        </Button>
        <Button className="hidden md:inline-flex">Sign Up</Button>

        {/* Drawer for Mobile Navigation */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col space-y-4 p-4 pb-8">
              <Link
                to="/about"
                className="text-lg font-medium pl-4"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                to="/pricing"
                className="text-lg font-medium pl-4"
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-4">
                <Button
                  variant="outline"
                  asChild
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
              <Button className="w-full" onClick={() => setOpen(false)}>
                Sign Up
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
