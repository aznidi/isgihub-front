import React from 'react';
import ProfileCard from './ProfileCard';
import { motion } from 'framer-motion';

const data = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: `Profil ${index + 1}`,
  role: index % 2 === 0 ? 'stagiaire' : 'formateur',
  year: 2023 - (index % 4),
  institute: `Institut Exemple ${index + 1}`,
  location: index % 2 === 0 ? 'Paris' : 'Lyon',
  avatar: 'https://via.placeholder.com/150',
}));

function SearchResults({ query, filter }) {
  const filteredData = data.filter((profile) => {
    const matchesQuery = profile.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || profile.role === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <motion.div
      className="w-full max-w-6xl mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {query.trim() || filter !== 'all'
          ? `Résultats de recherche (${filteredData.length})`
          : 'Suggestions de profils'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-6">Aucun résultat trouvé.</p>
      )}
    </motion.div>
  );
}

export default SearchResults;
