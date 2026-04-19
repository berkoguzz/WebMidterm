import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const linkClass = ({ isActive }) =>
        isActive
            ? "text-yellow-400"
            : "text-slate-300 hover:text-yellow-400 transition";

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-black/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link to="/" className="text-xl font-bold tracking-wide text-yellow-400">
                    GOT Wiki
                </Link>

                <div className="flex gap-6 text-sm md:text-base">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/characters" className={linkClass}>Characters</NavLink>
                    <NavLink to="/houses" className={linkClass}>Houses</NavLink>
                    <NavLink to="/books" className={linkClass}>Books</NavLink>
                </div>
            </div>
        </nav>
    );
}