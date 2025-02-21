import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function Buscador() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setResultados([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetch(`${apiUrl}/api/books/s/search?query=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => setResultados(data)) // ✅ Guarda los resultados en el estado
        .catch((err) => console.error("Error en la búsqueda:", err));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="px-4 py-6 sm:px-0 relative">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-1 flex rounded-md shadow-sm"
      >
        <input
          type="text"
          name="search"
          id="search"
          className="py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
          placeholder="Buscar libros..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

      </form>

      {resultados.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {resultados.map((book) => (
            <a
              key={book.id}
              href={`/book/${book.id}`}
              className="block py-7 px-2  cursor-pointer border-b border-gray-200 last:border-none hover:bg-blue-500"
            >
              <strong className="block text-indigo-700">{book.title}</strong>
              <span className="text-gray-600 text-sm">{book.author}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
