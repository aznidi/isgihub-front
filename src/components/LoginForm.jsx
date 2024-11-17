import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import photo from "../assets/photo.jpg";
import { Link, useNavigate } from "react-router-dom"; // Importer useNavigate
import { signInWithEmailAndPassword } from "firebase/auth"; // Importer Firebase Auth
import { auth } from "../../firebase-config"; // Assurez-vous que Firebase est configuré
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate(); // Initialiser useNavigate

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresse e-mail invalide")
        .required("E-mail requis"),
      password: Yup.string()
        .min(6, "Minimum 6 caractères")
        .required("Mot de passe requis"),
    }),
    onSubmit: async (values) => {
      try {
        // Connexion via Firebase
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log("Utilisateur connecté :", userCredential.user);

        // Affiche une notification de succès
        toast.success("Connexion réussie !", {
          position: "top-right",
          autoClose: 2000, // Ferme automatiquement après 2 secondes
          hideProgressBar: false,
          closeOnClick: true,
        });

        // Redirection vers la page d'accueil
        setTimeout(() => {
          navigate("/"); // Redirige vers la page racine "/"
        }, 1500); // Délai pour afficher la Toast
      } catch (error) {
        // Gérer les erreurs Firebase
        if (error.code === "auth/user-not-found") {
          toast.error("Aucun utilisateur trouvé avec cet e-mail.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else if (error.code === "auth/wrong-password") {
          toast.error("Mot de passe incorrect.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else {
          toast.error("Une erreur est survenue.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }

        console.error("Erreur Firebase :", error.message);
      }
    },
  });

  return (
    <div className="flex flex-col lg:flex-row w-11/12 max-w-5xl py-8 bg-white shadow-md rounded-lg overflow-hidden mt-12">
      {/* Section gauche */}
      <div
        className="lg:w-1/2 w-full h-48 lg:h-auto bg-cover bg-center"
        style={{
          backgroundImage: `url('${photo}')`,
        }}
      ></div>

      {/* Section droite */}
      <div className="lg:w-1/2 w-full p-6 sm:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          Connectez-vous
        </h2>
        <p className="text-sm lg:text-base text-gray-600 mb-6">
          Heureux de vous revoir !
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Global Error */}
          {formik.errors.email && formik.errors.password && (
            <p className="text-red-500 text-sm">
              Veuillez remplir tous les champs.
            </p>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              aria-label="Adresse e-mail"
              aria-required="true"
              placeholder="Adresse e-mail"
              className={`border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              aria-label="Mot de passe"
              aria-required="true"
              placeholder="Mot de passe"
              className={`border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Se souvenir de moi
              </label>
            </div>
            <Link
              to="forgot-password"
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-purple-600 hover:text-purple-800">
          <Link to="/register">Vous n'avez pas de compte ? Inscrivez-vous</Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
