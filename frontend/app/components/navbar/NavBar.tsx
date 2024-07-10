import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilter";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-3 border-b bg-white z-10">
      <div className="max-width-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logo.png"
              alt="HomeAway logo"
              width={80}
              height={10}
            />
          </Link>
          <div className="ml-4 flex items-center space-x-6">
            <SearchFilters />
            <AddPropertyButton />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
