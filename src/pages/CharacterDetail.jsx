import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCharacter } from "../services/api";
import characterImages from "../data/characterImages";

function getDisplayName(character) {
    return character.name || character.aliases?.[0] || "Unknown Character";
}

export default function CharacterDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        getCharacter(id)
            .then((data) => setCharacter(data))
            .catch(() => setError("Failed to load character."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black px-6 py-16 text-white">
                <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                    Loading character...
                </div>
            </div>
        );
    }

    if (error || !character) {
        return (
            <div className="min-h-screen bg-black px-6 py-16 text-white">
                <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-yellow-400">
                        Character Not Found
                    </h1>
                    <Link to="/characters" className="text-yellow-400 hover:underline">
                        Back to Characters
                    </Link>
                </div>
            </div>
        );
    }

    const displayName = getDisplayName(character);
    const image =
        characterImages[displayName] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=facc15&size=512`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 py-12 text-white">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <img
                    src={image}
                    alt={displayName}
                    className="h-80 w-full object-cover"
                />

                <div className="space-y-6 p-8">
                    <div>
                        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                            Character Profile
                        </p>
                        <h1 className="text-4xl font-bold text-yellow-400">
                            {displayName}
                        </h1>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                            <p className="mb-2 text-sm text-slate-400">Culture</p>
                            <p className="text-lg font-semibold text-white">
                                {character.culture || "Unknown"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                            <p className="mb-2 text-sm text-slate-400">Born</p>
                            <p className="text-lg font-semibold text-white">
                                {character.born || "Unknown"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                            <p className="mb-2 text-sm text-slate-400">Gender</p>
                            <p className="text-lg font-semibold text-white">
                                {character.gender || "Unknown"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                            <p className="mb-2 text-sm text-slate-400">Aliases</p>
                            <p className="text-lg font-semibold text-white">
                                {character.aliases?.filter(Boolean).join(", ") || "None"}
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/characters"
                        className="inline-block rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                    >
                        Back to Characters
                    </Link>
                </div>
            </div>
        </div>
    );
}