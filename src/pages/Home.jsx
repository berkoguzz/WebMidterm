import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-black via-slate-950 to-black text-white">
            <section className="relative flex min-h-[70vh] items-center justify-center px-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08),transparent_40%)]"></div>

                <div className="relative z-10 mx-auto max-w-4xl">
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
                        Welcome to Westeros
                    </p>

                    <h1 className="mb-6 text-5xl font-bold leading-tight text-yellow-400 md:text-7xl">
                        Game of Thrones Wiki
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-base text-slate-300 md:text-lg">
                        Explore characters, famous houses, and books from the Ice and Fire universe with a modern React UI.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            to="/characters"
                            className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                        >
                            Explore Characters
                        </Link>

                        <Link
                            to="/houses"
                            className="rounded-xl border border-yellow-500 px-6 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
                        >
                            View Houses
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}