const BASE_URL = "https://anapioficeandfire.com/api";

export const getCharacters = async (page = 1, pageSize = 20) => {
    const res = await fetch(`${BASE_URL}/characters?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) throw new Error("Failed to fetch characters");
    return res.json();
};

export const getCharacter = async (id) => {
    const res = await fetch(`${BASE_URL}/characters/${id}`);
    if (!res.ok) throw new Error("Failed to fetch character");
    return res.json();
};

export const getHouses = async (page = 1, pageSize = 24) => {
    const res = await fetch(`${BASE_URL}/houses?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) throw new Error("Failed to fetch houses");
    return res.json();
};

export const getHouse = async (id) => {
    const res = await fetch(`${BASE_URL}/houses/${id}`);
    if (!res.ok) throw new Error("Failed to fetch house");
    return res.json();
};

export const getBooks = async () => {
    const res = await fetch(`${BASE_URL}/books`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
};

export const getBook = async (id) => {
    const res = await fetch(`${BASE_URL}/books/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return res.json();
};