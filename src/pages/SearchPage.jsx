import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

function SearchPage() {
  const [query, setQuery] = useState(''); // Texte de recherche
  const [filter, setFilter] = useState('all'); // Filtre actif : 'all', 'stagiaire', 'formateur'

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {/* Barre de recherche */}
      <SearchBar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />

      {/* Résultats */}
      <SearchResults query={query} filter={filter} />
    </div>
  );
}

export default SearchPage;
