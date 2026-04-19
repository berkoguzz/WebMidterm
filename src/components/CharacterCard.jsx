import { Link } from "react-router-dom";
import characterImages from "../data/characterImages";

function getDisplayName(character) {
    return character.name || character.aliases?.[0] || "Unknown Character";
}

export default function CharacterCard({ character }) {
    const displayName = getDisplayName(character);
    const image =
        characterImages[displayName] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=facc15&size=512`;

    const culture = character.culture || "Unknown";
    const born = character.born || "Unknown";
    const id = character.url.split("/").pop();

    return (
        <Link to={`/characters/${id}`}>
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-2xl">
                <img
                    src={image}
                    alt={displayName}
                    className="h-56 w-full object-cover"
                />

                <div className="space-y-3 p-5">
                    <h2 className="text-lg font-bold text-yellow-400">
                        {displayName}
                    </h2>

                    <p className="text-sm text-slate-300">
                        Culture: {culture}
                    </p>

                    <p className="text-sm text-slate-400">
                        Born: {born}
                    </p>
                </div>
            </div>
        </Link>
    );
}