import { RouterProvider } from "react-router-dom"; // Utiliser RouterProvider
import { router } from "./router/index"; // Importer le router configuré
import { AuthProvider } from "./context/AuthContext"; // Importer le AuthProvider

function App() {
  return (
    <AuthProvider> {/* AuthProvider doit envelopper RouterProvider */}
      <RouterProvider router={router} /> {/* RouterProvider englobe tout */}
    </AuthProvider>
  );
}

export default App;
