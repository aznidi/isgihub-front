import React from "react";

function NavbarRight () {
  return (
    <div className="fixed right-0 h-full bg-ofppt-bleu text-white flex flex-col items-center p-4">
      <input
        type="text"
        placeholder="Rechercher"
        className="mb-4 p-2 border border-ofppt-gris rounded-lg text-black placeholder-gray-500"
      />
      <div className="text-white text-lg">Profil</div>
    </div>
  );
};
export default NavbarRight