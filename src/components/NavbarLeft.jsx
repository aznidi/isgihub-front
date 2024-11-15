import React from "react";

function NavbarLeft () {
  return (
    <div className="fixed left-0 h-full bg-ofppt-bleu text-white flex flex-col items-center p-4">
      <div className="text-ofppt-vert text-xl font-bold mb-4">Logo</div>
      <button className="mb-2">Home</button>
      <button className="mb-2">Search</button>
      <button className="mb-2">Files</button>
      <button className="mb-2">Notifications</button>
      <button>Settings</button>
    </div>
  );
};
export default NavbarLeft;
