import { useEffect, useMemo, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import { getCharacters } from "../services/api";

const popularNames = [
    "Jon Snow",
    "Daenerys Targaryen",
    "Tyrion Lannister",
    "Arya Stark",
    "Sansa Stark",
    "Bran Stark",
    "Eddard Stark",
    "Catelyn Stark",
    "Robb Stark",
    "Cersei Lannister",
    "Jaime Lannister",
    "Tywin Lannister",
    "Joffrey Baratheon",
    "Robert Baratheon",
    "Stannis Baratheon",
    "Renly Baratheon",
    "Petyr Baelish",
    "Varys",
    "Brienne of Tarth",
    "Sandor Clegane",
    "Samwell Tarly",
    "Jorah Mormont",
    "Ygritte",
    "Tormund Giantsbane",
    "Melisandre",
    "Davos Seaworth",
    "Grey Worm",
    "Missandei",
    "Daario Naharis",
    "Khal Drogo",
    "Oberyn Martell",
    "Ellaria Sand",
    "Theon Greyjoy",
    "Yara Greyjoy",
    "Ramsay Bolton",
    "Roose Bolton",
    "Margaery Tyrell",
    "Olenna Tyrell",
    "Loras Tyrell",
];

function getDisplayName(character) {
    return character.name || character.aliases?.[0] || "";
}

export default function Characters() {
    const [allCharacters, setAllCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [cultureFilter, setCultureFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const perPage = 20;

    useEffect(() => {
        async function fetchAllCharacters() {
            try {
                setLoading(true);
                setError("");

                const totalPagesToFetch = 40;
                const requests = [];

                for (let i = 1; i <= totalPagesToFetch; i++) {
                    requests.push(getCharacters(i, 50));
                }

                const results = await Promise.all(requests);
                const merged = results.flat();

                const filtered = merged.filter((character) => getDisplayName(character).trim() !== "");

                const uniqueCharacters = filtered.filter(
                    (character, index, self) =>
                        index === self.findIndex((c) => getDisplayName(c) === getDisplayName(character))
                );

                const sorted = [...uniqueCharacters].sort((a, b) => {
                    const aName = getDisplayName(a);
                    const bName = getDisplayName(b);

                    const aIndex = popularNames.indexOf(aName);
                    const bIndex = popularNames.indexOf(bName);

                    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
                    if (aIndex !== -1) return -1;
                    if (bIndex !== -1) return 1;

                    return aName.localeCompare(bName);
                });

                setAllCharacters(sorted);
            } catch {
                setError("Failed to load characters.");
            } finally {
                setLoading(false);
            }
        }

        fetchAllCharacters();
    }, []);

    const genderOptions = useMemo(() => {
        const genders = allCharacters
            .map((character) => character.gender?.trim() || "Unknown")
            .filter(Boolean);

        return ["All", ...new Set(genders)];
    }, [allCharacters]);

    const cultureOptions = useMemo(() => {
        const cultures = allCharacters
            .map((character) => character.culture?.trim() || "Unknown")
            .filter(Boolean);

        return ["All", ...new Set(cultures)].slice(0, 30);
    }, [allCharacters]);

    const filteredCharacters = useMemo(() => {
        return allCharacters.filter((character) => {
            const name = getDisplayName(character).toLowerCase();
            const gender = character.gender?.trim() || "Unknown";
            const culture = character.culture?.trim() || "Unknown";

            const matchesSearch = name.includes(search.toLowerCase());
            const matchesGender = genderFilter === "All" || gender === genderFilter;
            const matchesCulture = cultureFilter === "All" || culture === cultureFilter;

            return matchesSearch && matchesGender && matchesCulture;
        });
    }, [allCharacters, search, genderFilter, cultureFilter]);

    const totalPages = Math.ceil(filteredCharacters.length / perPage);

    const visibleCharacters = useMemo(() => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return filteredCharacters.slice(start, end);
    }, [filteredCharacters, page]);

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-3 text-center text-4xl font-bold text-yellow-400">
                    Characters
                </h1>

                <p className="mb-8 text-center text-slate-400">
                    Search and filter characters from the API
                </p>

                <SearchBar search={search} setSearch={handleSearchChange} />

                <div className="mb-8 grid gap-4 md:grid-cols-2">
                    <select
                        value={genderFilter}
                        onChange={(e) => {
                            setGenderFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    >
                        {genderOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>

                    <select
                        value={cultureFilter}
                        onChange={(e) => {
                            setCultureFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    >
                        {cultureOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-8 flex items-center justify-between text-sm text-slate-400">
                    <span>Total characters: {filteredCharacters.length}</span>
                    <span>Page {totalPages === 0 ? 0 : page} / {totalPages}</span>
                </div>

                {loading && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                        Loading characters...
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-800 bg-red-950 p-10 text-center text-red-300">
                        {error}
                    </div>
                )}

                {!loading && !error && visibleCharacters.length === 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                        No characters found.
                    </div>
                )}

                {!loading && !error && visibleCharacters.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visibleCharacters.map((character) => (
                            <CharacterCard key={character.url} character={character} />
                        ))}
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