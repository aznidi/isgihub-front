function NavbarTop () {
  return (
    <div className="fixed top-0 w-full bg-ofppt-bleu text-white flex justify-between items-center p-4">
      <div className="text-ofppt-vert text-xl font-bold">Logo</div>
      <input
        type="text"
        placeholder="Rechercher"
        className="flex-grow mx-4 p-2 border border-ofppt-gris rounded-lg text-black placeholder-gray-500"
      />
      <div className="text-white text-lg">Profil</div>
    </div>
  );
};
export default NavbarTop;
