import React from 'react';
import ProfileCard from './ProfileCard';
import { motion } from 'framer-motion';

// Données simulées
const data = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: `Profil ${index + 1}`,
  role: index % 2 === 0 ? 'stagiaire' : 'formateur',
  email: `profil${index + 1}@example.com`,
  avatar: 'https://via.placeholder.com/150',
}));

function SearchResults({ query, filter }) {
  // Filtrer les profils selon la recherche et le rôle
  const filteredData = data.filter((profile) => {
    const matchesQuery = profile.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || profile.role === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="w-full max-w-6xl mt-6">
      {/* Titre */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {query.trim() || filter !== 'all'
          ? `Résultats de recherche (${filteredData.length})`
          : 'Suggestions de profils'}
      </h2>

      {/* Grille de résultats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredData.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </motion.div>

      {/* Message si aucun résultat */}
      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-6">Aucun résultat trouvé.</p>
      )}
    </div>
  );
}

export default SearchResults;
