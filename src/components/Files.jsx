import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FileCard from "./FileCard";
import { Oval } from "react-loader-spinner";

const Files = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("Tout");
  const [selectedYear, setSelectedYear] = useState("Tout");
  const [isLoading, setIsLoading] = useState(false);

  const files = [
    {
      image: "https://via.placeholder.com/80",
      moduleName: "React",
      type: "EFM",
      instructor: "Formateur 1",
      year: "2024",
      description: "Ce module couvre les bases de React, y compris les composants, les états, et le routage.",
      fileUrl: "https://example.com/file1.pdf",
    },
    {
      image: "https://via.placeholder.com/80",
      moduleName: "JavaScript",
      type: "Cours",
      instructor: "Formateur 2",
      year: "2023",
      description: "Introduction approfondie à JavaScript avec des exemples et des exercices pratiques.",
      fileUrl: "https://example.com/file2.docx",
    },
    {
      image: "https://via.placeholder.com/80",
      moduleName: "Python",
      type: "TP",
      instructor: "Formateur 6",
      year: "2022",
      description: "Introduction à Python avec des exercices pratiques sur les algorithmes.",
      fileUrl: "https://example.com/file6.pdf",
    },
    {
      image: "https://via.placeholder.com/80",
      moduleName: "Node.js",
      type: "EFF",
      instructor: "Formateur 7",
      year: "2025",
      description: "Créer des serveurs backend robustes avec Node.js et Express.",
      fileUrl: "https://example.com/file7.pdf",
    },
    {
      image: "https://via.placeholder.com/80",
      moduleName: "SQL",
      type: "TP",
      instructor: "Formateur 8",
      year: "2024",
      description: "Gérez des bases de données relationnelles avec SQL.",
      fileUrl: "https://example.com/file8.pdf",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFileType, selectedYear]);

  const handleFileTypeFilter = (type) => setSelectedFileType(type);
  const handleYearFilter = (year) => setSelectedYear(year);

  const filteredFiles = files.filter(
    (file) =>
      (selectedFileType === "Tout" || file.type === selectedFileType) &&
      (selectedYear === "Tout" || file.year === selectedYear) &&
      (searchTerm === "" || file.moduleName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  return (
    <div className="flex flex-col items-center px-4 mt-10 space-y-8">
      <motion.div
        className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Section de recherche */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Rechercher un fichier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Search className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <select
            onChange={(e) => handleFileTypeFilter(e.target.value)}
            className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 transition-all"
          >
            <option value="Tout">Tous les types</option>
            <option value="EFM">EFM</option>
            <option value="Cours">Cours</option>
            <option value="TP">TP</option>
            <option value="EFF">EFF</option>
          </select>

          <select
            onChange={(e) => handleYearFilter(e.target.value)}
            className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 transition-all"
          >
            <option value="Tout">Toutes les années</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

      </motion.div>

      {/* Liste des fichiers */}
      <div className="w-full max-w-4xl space-y-6">
        {isLoading ? (
          <div className="flex justify-center">
            <Oval height={50} width={50} color="#4A90E2" />
          </div>
        ) : filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FileCard {...file} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">Aucun fichier trouvé</p>
        )}
      </div>
    </div>
  );
};

export default Files;
