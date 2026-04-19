import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHouse } from "../services/api";

export default function HouseDetail() {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [currentLordName, setCurrentLordName] = useState("Unknown");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchHouseDetail() {
            try {
                setLoading(true);
                setError("");

                const houseData = await getHouse(id);
                setHouse(houseData);

                if (houseData.currentLord) {
                    try {
                        const response = await fetch(houseData.currentLord);
                        const lordData = await response.json();

                        const lordName =
                            lordData.name ||
                            lordData.aliases?.find(Boolean) ||
                            "Unknown";

                        setCurrentLordName(lordName);
                    } catch {
                        setCurrentLordName("Unknown");
                    }
                } else {
                    setCurrentLordName("Unknown");
                }
            } catch {
                setError("Failed to load house.");
            } finally {
                setLoading(false);
            }
        }

        fetchHouseDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen px-6 py-16 text-white">
                <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                    Loading house...
                </div>
            </div>
        );
    }

    if (error || !house) {
        return (
            <div className="min-h-screen px-6 py-16 text-white">
                <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-yellow-400">House Not Found</h1>
                    <Link to="/houses" className="text-yellow-400 hover:underline">
                        Back to Houses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 py-12 text-white">
            <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <div className="border-b border-slate-800 bg-slate-950 p-8">
                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">
                        House Detail
                    </p>
                    <h1 className="text-4xl font-bold text-yellow-400">
                        {house.name || "Unknown House"}
                    </h1>
                </div>

                <div className="grid gap-4 p-8 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Region</p>
                        <p className="text-lg font-semibold">{house.region || "Unknown"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Words</p>
                        <p className="text-lg font-semibold">{house.words || "No official words"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5 md:col-span-2">
                        <p className="mb-2 text-sm text-slate-400">Coat of Arms</p>
                        <p className="text-lg font-semibold">{house.coatOfArms || "Unknown"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Titles</p>
                        <p className="text-lg font-semibold">
                            {house.titles?.filter(Boolean).join(", ") || "None"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Seats</p>
                        <p className="text-lg font-semibold">
                            {house.seats?.filter(Boolean).join(", ") || "Unknown"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Founded</p>
                        <p className="text-lg font-semibold">{house.founded || "Unknown"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Current Lord</p>
                        <p className="text-lg font-semibold">{currentLordName}</p>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <Link
                        to="/houses"
                        className="inline-block rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                    >
                        Back to Houses
                    </Link>
                </div>
            </div>
        </div>
    );
}