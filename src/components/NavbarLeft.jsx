import React from "react";

function NavbarLeft () {
  return (
    <div className="font-sans fixed left-0 h-full bg-ofppt-bleu text-white flex flex-col items-center p-4">
      <div className="text-ofppt-vert text-xl font-bold mb-4">Logo</div>
      <a className="mb-2">Home</a>
      <a className="mb-2">Search</a>
      <a className="mb-2">Files</a>
      <a className="mb-2">Notifications</a>
      <a>Settings</a>
    </div>
  );
};
export default NavbarLeft;
