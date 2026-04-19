import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../services/api";

function formatDate(dateString) {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
}

function getBookCoverClass(index) {
    const covers = [
        "from-red-950 to-black",
        "from-blue-950 to-black",
        "from-green-950 to-black",
        "from-purple-950 to-black",
        "from-yellow-950 to-black",
    ];

    return covers[index % covers.length];
}

export default function Books() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [authorFilter, setAuthorFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getBooks()
            .then((data) => {
                const filtered = data.filter((book) => book.name && book.name.trim() !== "");
                setBooks(filtered);
            })
            .catch(() => {
                setError("Failed to load books.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const authorOptions = useMemo(() => {
        const authors = books.flatMap((book) => book.authors || []);
        return ["All", ...new Set(authors)];
    }, [books]);

    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch = book.name.toLowerCase().includes(search.toLowerCase());
            const matchesAuthor =
                authorFilter === "All" || (book.authors || []).includes(authorFilter);

            return matchesSearch && matchesAuthor;
        });
    }, [books, search, authorFilter]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-3 text-center text-4xl font-bold text-yellow-400">
                    Books
                </h1>

                <p className="mb-8 text-center text-slate-400">
                    Search and filter books from the API
                </p>

                <div className="mb-8 grid gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Search book title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    />

                    <select
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    >
                        {authorOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-8 text-sm text-slate-400">
                    Total books: {filteredBooks.length}
                </div>

                {loading && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                        Loading books...
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-800 bg-red-950 p-10 text-center text-red-300">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBooks.map((book, index) => {
                            const id = book.url.split("/").pop();

                            return (
                                <Link
                                    to={`/books/${id}`}
                                    key={book.isbn}
                                    className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-2xl"
                                >
                                    <div className={`flex h-56 items-end bg-gradient-to-b p-6 ${getBookCoverClass(index)}`}>
                                        <div>
                      <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-black">
                        Book
                      </span>
                                            <h2 className="mt-4 text-2xl font-bold text-yellow-400">
                                                {book.name}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="space-y-3 p-6 text-sm text-slate-300">
                                        <p><span className="font-semibold text-white">Author:</span> {book.authors?.join(", ") || "Unknown"}</p>
                                        <p><span className="font-semibold text-white">Pages:</span> {book.numberOfPages || "Unknown"}</p>
                                        <p><span className="font-semibold text-white">Publisher:</span> {book.publisher || "Unknown"}</p>
                                        <p><span className="font-semibold text-white">Released:</span> {formatDate(book.released)}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}