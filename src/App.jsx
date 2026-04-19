import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Houses from "./pages/Houses";
import HouseDetail from "./pages/HouseDetail";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen flex-col bg-black">
                <Navbar />

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/characters" element={<Characters />} />
                        <Route path="/characters/:id" element={<CharacterDetail />} />
                        <Route path="/houses" element={<Houses />} />
                        <Route path="/houses/:id" element={<HouseDetail />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/books/:id" element={<BookDetail />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}