import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Bookmark } from "lucide-react";

const FileCard = ({ image, moduleName, type, instructor, year, description, fileUrl }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={moduleName}
          className="w-20 h-20 rounded-lg object-cover border border-gray-200 shadow-sm"
        />
        <div className="flex flex-col space-y-1">
          <h3 className="text-2xl font-semibold text-gray-800">{moduleName}</h3>
          <p className="text-sm text-gray-600">{type}</p>
          <p className="text-sm text-gray-500">{instructor} - {year}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">{description}</p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex justify-between space-x-4">
          <Button
            onClick={() => window.open(fileUrl, "_blank")}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Ouvrir</span>
          </Button>
          <Button
            onClick={() => alert("Fichier sauvegardé !")}
            className="flex items-center space-x-2 text-green-500 hover:text-green-600"
          >
            <Bookmark className="w-5 h-5" />
            <span>Sauvegarder</span>
          </Button>
        </div>
        <Button
          onClick={() => {
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = fileUrl.split("/").pop();
            link.click();
          }}
          className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-yellow-500 hover:text-yellow-600 bg-yellow-100 rounded-md"
        >
          <Download className="w-5 h-5" />
          <span>Télécharger</span>
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
