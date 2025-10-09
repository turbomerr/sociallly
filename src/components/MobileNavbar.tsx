"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false); //show mobilmenu
  const { isSignedIn, } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        {/* content */}
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6 mx-2">
            <SheetClose asChild>
              <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                <Link href="/" className="hover:underline hover:underline-offset-4">
                  <HomeIcon className="w-4 h-4" />
                  Home
                </Link>
              </Button>
            </SheetClose>

            {isSignedIn ? (
              <>
                <SheetClose asChild>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                    <Link href="/notifications" className="hover:underline hover:underline-offset-4">
                      <BellIcon className="w-4 h-4" />
                      Notifications
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                    <Link href="/profile" className="hover:underline hover:underline-offset-4">
                      <UserIcon className="w-4 h-4" />
                      Profile
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <SignOutButton>
                    <Button variant="ghost" className="flex items-center gap-3 justify-start w-full hover:underline hover:underline-offset-4">
                      <LogOutIcon className="w-4 h-4" />
                      Logout
                    </Button>
                  </SignOutButton>
                </SheetClose>
              </>
            ) : (
              
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full hover:underline hover:underline-offset-4">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;