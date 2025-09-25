import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
// import MobileNavbar from "./MobileNavbar";



function Navbar() {

    return (
        <header className="sticky top-8 z-50">
            <div className="mx-auto w-full max-w-[1200px] rounded-xl border border-green-500 bg-card
                  flex h-16 items-center justify-between px-4">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
                            Sociallly
                        </Link>
                    </div>
                    <DesktopNavbar/>
            </div>
        </header>
    );

}
export default Navbar;