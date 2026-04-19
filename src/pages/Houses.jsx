import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getHouses } from "../services/api";

const popularHouses = [
    "House Stark of Winterfell",
    "House Targaryen of King's Landing",
    "House Lannister of Casterly Rock",
    "House Baratheon of Storm's End",
    "House Greyjoy of Pyke",
    "House Martell of Sunspear",
    "House Tyrell of Highgarden",
    "House Arryn of the Eyrie",
    "House Tully of Riverrun",
    "House Bolton of the Dreadfort",
];

function getHouseTheme(name) {
    const lower = name.toLowerCase();

    if (lower.includes("stark")) {
        return {
            ring: "hover:border-slate-300",
            dot: "bg-slate-400",
        };
    }
    if (lower.includes("lannister")) {
        return {
            ring: "hover:border-red-500",
            dot: "bg-red-600",
        };
    }
    if (lower.includes("targaryen")) {
        return {
            ring: "hover:border-red-700",
            dot: "bg-red-800",
        };
    }
    if (lower.includes("baratheon")) {
        return {
            ring: "hover:border-yellow-400",
            dot: "bg-yellow-500",
        };
    }
    if (lower.includes("tyrell")) {
        return {
            ring: "hover:border-green-500",
            dot: "bg-green-500",
        };
    }
    if (lower.includes("martell")) {
        return {
            ring: "hover:border-orange-500",
            dot: "bg-orange-500",
        };
    }
    if (lower.includes("greyjoy")) {
        return {
            ring: "hover:border-zinc-400",
            dot: "bg-zinc-400",
        };
    }
    if (lower.includes("arryn")) {
        return {
            ring: "hover:border-sky-400",
            dot: "bg-sky-400",
        };
    }
    if (lower.includes("tully")) {
        return {
            ring: "hover:border-blue-500",
            dot: "bg-blue-500",
        };
    }
    if (lower.includes("bolton")) {
        return {
            ring: "hover:border-pink-500",
            dot: "bg-pink-500",
        };
    }

    return {
        ring: "hover:border-yellow-500",
        dot: "bg-slate-500",
    };
}
export default function Houses() {
    const [houses, setHouses] = useState([]);
    const [search, setSearch] = useState("");
    const [regionFilter, setRegionFilter] = useState("All");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const perPage = 12;

    useEffect(() => {
        async function fetchAllHouses() {
            try {
                setLoading(true);
                setError("");

                const totalPagesToFetch = 10;
                const requests = [];

                for (let i = 1; i <= totalPagesToFetch; i++) {
                    requests.push(getHouses(i, 50));
                }

                const results = await Promise.all(requests);
                const merged = results.flat();

                const filtered = merged.filter((house) => house.name && house.name.trim() !== "");

                const uniqueHouses = filtered.filter(
                    (house, index, self) =>
                        index === self.findIndex((h) => h.name === house.name)
                );

                const sorted = [...uniqueHouses].sort((a, b) => {
                    const aIndex = popularHouses.indexOf(a.name);
                    const bIndex = popularHouses.indexOf(b.name);

                    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                    if (aIndex !== -1) return -1;
                    if (bIndex !== -1) return 1;

                    return a.name.localeCompare(b.name);
                });

                setHouses(sorted);
            } catch {
                setError("Failed to load houses.");
            } finally {
                setLoading(false);
            }
        }

        fetchAllHouses();
    }, []);

    const regionOptions = useMemo(() => {
        const regions = houses
            .map((house) => house.region?.trim() || "Unknown")
            .filter(Boolean);

        return ["All", ...new Set(regions)];
    }, [houses]);

    const filteredHouses = useMemo(() => {
        return houses.filter((house) => {
            const region = house.region?.trim() || "Unknown";
            const matchesSearch = house.name.toLowerCase().includes(search.toLowerCase());
            const matchesRegion = regionFilter === "All" || region === regionFilter;

            return matchesSearch && matchesRegion;
        });
    }, [houses, search, regionFilter]);

    const totalPages = Math.ceil(filteredHouses.length / perPage);

    const visibleHouses = useMemo(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return filteredHouses.slice(start, end);
    }, [filteredHouses, page]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-3 text-center text-4xl font-bold text-yellow-400">
                    Great Houses
                </h1>

                <p className="mb-6 text-center text-slate-400">
                    Famous houses of Westeros from the API
                </p>

                <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
                    <h2 className="mb-4 text-lg font-bold text-yellow-400">House Color Guide</h2>

                    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <h2 className="mb-4 text-lg font-bold text-yellow-400">House Color Guide</h2>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-slate-400"></span>
                                <span>Stark</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-600"></span>
                                <span>Lannister</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-800"></span>
                                <span>Targaryen</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                                <span>Baratheon</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                                <span>Tyrell</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-orange-500"></span>
                                <span>Martell</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-zinc-400"></span>
                                <span>Greyjoy</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-sky-400"></span>
                                <span>Arryn</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                                <span>Tully</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-pink-500"></span>
                                <span>Bolton</span>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-slate-400">
                            Colored dots on cards represent major house themes.
                        </p>
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                        House cards use different accent colors to visually distinguish famous families.
                    </p>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Search house name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    />

                    <select
                        value={regionFilter}
                        onChange={(e) => {
                            setRegionFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    >
                        {regionOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-8 flex items-center justify-between text-sm text-slate-400">
                    <span>Total houses: {filteredHouses.length}</span>
                    <span>Page {totalPages === 0 ? 0 : page} / {totalPages}</span>
                </div>

                {loading && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                        Loading houses...
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-800 bg-red-950 p-10 text-center text-red-300">
                        {error}
                    </div>
                )}

                {!loading && !error && visibleHouses.length === 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                        No houses found.
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleHouses.map((house) => {
                            const theme = getHouseTheme(house.name);
                            const id = house.url.split("/").pop();

                            return (
                                <Link
                                    to={`/houses/${id}`}
                                    key={house.url}
                                    className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${theme.ring}`}
                                >
                                    <div className="mb-4 flex items-start justify-between gap-3">
                                        <h2 className="text-2xl font-bold text-yellow-400">
                                            {house.name}
                                        </h2>

                                        <span
                                            className={`mt-2 h-4 w-4 rounded-full ${theme.dot}`}
                                            title="House theme color"
                                        ></span>
                                    </div>

                                    <div className="space-y-3 text-sm text-slate-300">
                                        <p>
                                            <span className="font-semibold text-white">Region:</span>{" "}
                                            {house.region || "Unknown"}
                                        </p>

                                        <p>
                                            <span className="font-semibold text-white">Words:</span>{" "}
                                            {house.words || "No official words"}
                                        </p>

                                        <p>
                                            <span className="font-semibold text-white">Coat of Arms:</span>{" "}
                                            {house.coatOfArms || "Unknown"}
                                        </p>

                                        <p>
                                            <span className="font-semibold text-white">Titles:</span>{" "}
                                            {house.titles?.filter(Boolean).slice(0, 2).join(", ") || "None"}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {!loading && !error && totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-3">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="rounded-xl bg-slate-800 px-5 py-2 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <div className="rounded-xl bg-slate-900 px-4 py-2 text-slate-300">
                            {page}
                        </div>

                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="rounded-xl bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}