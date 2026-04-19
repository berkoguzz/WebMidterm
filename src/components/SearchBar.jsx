export default function SearchBar({ search, setSearch }) {
    return (
        <div className="mx-auto mb-8 max-w-3xl">
            <input
                type="text"
                placeholder="Search character by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none transition focus:border-yellow-400"
            />
        </div>
    );
}