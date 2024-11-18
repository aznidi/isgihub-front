import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import photo from "../assets/photo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config"; // Assurez-vous que Firebase est correctement configuré
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

const LoginForm = () => {
  const navigate = useNavigate(); // Pour gérer la navigation
  const [isLoading, setIsLoading] = useState(false); // Gestion du spinner de chargement

  // Utilisation de Formik pour la gestion du formulaire
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresse e-mail invalide")
        .required("L'e-mail est requis"),
      password: Yup.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .required("Le mot de passe est requis"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true); // Activation du spinner

      try {
        // Authentification avec Firebase
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        // Notification de succès
        toast.success("Connexion réussie !", {
          position: "top-right",
          autoClose: 2000,
        });

        // Désactivation du spinner et redirection
        setTimeout(() => {
          navigate("/"); // Redirige vers la page d'accueil
        }, 1000);
      } catch (error) {
        setIsLoading(false); // Désactivation du spinner en cas d'erreur

        // Gestion des erreurs d'authentification
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("Aucun utilisateur trouvé avec cet e-mail.", {
              position: "top-right",
              autoClose: 3000,
            });
            break;
          case "auth/wrong-password":
            toast.error("Mot de passe incorrect.", {
              position: "top-right",
              autoClose: 3000,
            });
            break;
          case "auth/user-disabled":
            toast.error("Ce compte a été désactivé.", {
              position: "top-right",
              autoClose: 3000,
            });
            break;
          case "auth/too-many-requests":
            toast.error(
              "Trop de tentatives de connexion. Veuillez réessayer plus tard.",
              {
                position: "top-right",
                autoClose: 3000,
              }
            );
            break;
          default:
            toast.error("Une erreur est survenue. Veuillez réessayer.", {
              position: "top-right",
              autoClose: 3000,
            });
        }
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
          {/* Champ Email */}
          <div>
            <input
              type="email"
              name="email"
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

          {/* Champ Mot de passe */}
          <div>
            <input
              type="password"
              name="password"
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
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Bouton Soumettre */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <TailSpin height="24" width="24" color="#FFFFFF" ariaLabel="loading" />
            ) : (
              "Se connecter"
            )}
          </button>

        </form>

        {/* Lien vers Inscription */}
        <div className="mt-4 text-center text-sm text-purple-600 hover:text-purple-800">
          <Link to="/register">Vous n'avez pas de compte ? Inscrivez-vous</Link>
        </div>
      </div>

      {/* ToastContainer */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
