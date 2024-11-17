import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import photo from "../assets/photo.jpg";
import { Link, useNavigate } from "react-router-dom"; // Importer useNavigate
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config"; // Assurez-vous que Firebase est configuré
import { TailSpin } from "react-loader-spinner";

const RegisterForm = () => {
  const navigate = useNavigate(); // Initialiser useNavigate
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le spinner

  const formik = useFormik({
    initialValues: {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(15, "Maximum 15 caractères")
        .required("Prénom requis"),
      surname: Yup.string()
        .max(20, "Maximum 20 caractères")
        .required("Nom requis"),
      email: Yup.string()
        .email("Adresse e-mail invalide")
        .required("E-mail requis"),
      password: Yup.string()
        .min(6, "Minimum 6 caractères")
        .required("Mot de passe requis"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
    }),
    onSubmit: async (values) => {
      try {
        // Inscription via Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        // Affiche une notification de succès
        toast.success("Inscription réussie !", {
          position: "top-right",
          autoClose: 2000, // Ferme automatiquement après 2 secondes
          hideProgressBar: false,
          closeOnClick: true,
        });

        setIsLoading(false); // Désactiver le spinner

          // Redirection vers /login après un délai
          setTimeout(() => {
            navigate("/login"); // Redirige vers la page de connexion
          }, 2000); // Délai pour permettre d'afficher la Toast
        } catch (error) {
        setIsLoading(false); // Désactiver le spinner en cas d'erreur
        // Gérer les erreurs Firebase
        if (error.code === "auth/email-already-in-use") {
          toast.error("L'adresse e-mail est déjà utilisée.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else if (error.code === "auth/weak-password") {
          toast.error("Le mot de passe est trop faible.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else if (error.code === "auth/invalid-email") {
          toast.error("L'adresse e-mail est invalide.", {
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
    <div className="flex flex-col lg:flex-row w-11/12 max-w-5xl bg-white py-5 shadow rounded-lg overflow-hidden">
      {/* Section gauche */}
      <div
        className="lg:w-1/2 w-full h-60 lg:h-auto bg-cover bg-center"
        style={{
          backgroundImage: `url('${photo}')`,
        }}
      ></div>

      {/* Section droite */}
      <div className="lg:w-1/2 w-full p-6 sm:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          Inscrivez-vous
        </h2>
        <p className="text-sm lg:text-base text-gray-600 mb-6">
          Créez votre compte. C'est gratuit et ne prend qu'une minute.
        </p>
        <form onSubmit={formik.handleSubmit}>
          {/* Prénom et Nom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="Entrez votre prénom"
                className={`border ${
                  formik.touched.firstname && formik.errors.firstname
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.firstname}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="surname"
                placeholder="Entrez votre nom"
                className={`border ${
                  formik.touched.surname && formik.errors.surname
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.surname}
              />
              {formik.touched.surname && formik.errors.surname && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.surname}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              className={`border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Entrez un mot de passe"
              className={`border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
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

          {/* Confirm Password */}
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              className={`border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <TailSpin
              height="24"
              width="24"
              color="#FFFFFF"
              ariaLabel="loading"
            />
          ) : (
            "Inscrivez-vous"
          )}
        </button>
        </form>
        <div className="px-2 py-2 text-sm text-purple-600 hover:text-purple-800">
          <Link to={"/login"}>
            Vous avez déjà un compte ? Connectez-vous
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
