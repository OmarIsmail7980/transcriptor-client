import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex px-5 md:px-8 lg:px-10 justify-between bg-[var(--search-bg)] p-5">
      <h1 className="font-bold text-xl">
        <Link to="/">Transcriptor</Link>
      </h1>
    </nav>
  );
}

export default Navbar
