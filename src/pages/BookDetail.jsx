import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../services/api";

function formatDate(dateString) {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
}

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        getBook(id)
            .then((data) => setBook(data))
            .catch(() => setError("Failed to load book."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen px-6 py-16 text-white">
                <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                    Loading book...
                </div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="min-h-screen px-6 py-16 text-white">
                <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-yellow-400">Book Not Found</h1>
                    <Link to="/books" className="text-yellow-400 hover:underline">
                        Back to Books
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 py-12 text-white">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                <div className="flex h-72 items-end bg-gradient-to-b from-red-950 to-black p-8">
                    <div>
                        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-300">
                            Book Detail
                        </p>
                        <h1 className="text-4xl font-bold text-yellow-400">
                            {book.name || "Unknown Book"}
                        </h1>
                    </div>
                </div>

                <div className="grid gap-4 p-8 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Authors</p>
                        <p className="text-lg font-semibold">
                            {book.authors?.join(", ") || "Unknown"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Pages</p>
                        <p className="text-lg font-semibold">{book.numberOfPages || "Unknown"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Publisher</p>
                        <p className="text-lg font-semibold">{book.publisher || "Unknown"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Released</p>
                        <p className="text-lg font-semibold">{formatDate(book.released)}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">Country</p>
                        <p className="text-lg font-semibold">{book.country || "Unknown"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5">
                        <p className="mb-2 text-sm text-slate-400">ISBN</p>
                        <p className="break-all text-lg font-semibold">{book.isbn || "Unknown"}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-black p-5 md:col-span-2">
                        <p className="mb-2 text-sm text-slate-400">Media Type</p>
                        <p className="text-lg font-semibold">{book.mediaType || "Unknown"}</p>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <Link
                        to="/books"
                        className="inline-block rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                    >
                        Back to Books
                    </Link>
                </div>
            </div>
        </div>
    );
}