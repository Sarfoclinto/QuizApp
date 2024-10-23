import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-20 flex items-center justify-between px-20 bg-primary/30 border-b-[1px] border-stone-500">
      <h1 className="text-3xl font-bold ">
        Qui<span>Zee</span>
      </h1>
      <nav className="flex justify-between w-1/5 items-center">
        <Link to="/" className="text-lg font-bold ">
          Home
        </Link>
        <Link to="settings" className="text-lg font-bold ">
          Get Started
        </Link>
        <Link to="" className=" font-bold text-3xl">
          Q
        </Link>
      </nav>
    </header>
  );
};

export default Header;
