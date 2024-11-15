<<<<<<< Updated upstream
// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email invalide")
    .required("Email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Mot de passe est requis"),
});

const LoginForm = () => {

  const [Submitting, setSubmitting] = useState(true)
  
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitting", values);
    setSubmitting(false);
  };

=======
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresse email invalide.")
        .required("L'email est requis."),
      password: Yup.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères.")
        .required("Le mot de passe est requis."),
    }),
    onSubmit: (values) => {
      console.log("Données de connexion :", values);
      alert("Connexion réussie !");
    },
  });
>>>>>>> Stashed changes
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Connexion</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Champ Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 -top-3 left-3 bg-white px-1 transition-all transform scale-75 origin-top-left"
            >
              Adresse email
            </label>
            <input
              id="email"
              name="email" type="email"
              placeholder="Entrez votre email"
<<<<<<< Updated upstream
              className="border border-gray-300 rounded-l p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
              className={`w-full p-4 border rounded-lg ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-400 focus:outline-none`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
>>>>>>> Stashed changes
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          {/* Champ Mot de passe */}
          <div className="relative">
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 -top-3 left-3 bg-white px-1 transition-all transform scale-75 origin-top-left"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
<<<<<<< Updated upstream
              className="border border-gray-300 rounded-l p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
              className={`w-full p-4 border rounded-lg ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:ring-2 focus:ring-blue-400 focus:outline-none`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
>>>>>>> Stashed changes
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
<<<<<<< Updated upstream
            className="bg-blue-500 text-white font-semibold p-2 rounded-full w-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isSubmitting}
=======
            className="w-full py-3 rounded-lg text-white font-bold bg-blue-500 hover:bg-blue-600 transition"
>>>>>>> Stashed changes
          >
            Se connecter
          </button>
<<<<<<< Updated upstream

          
        </Form>
      )}
    </Formik>
=======
        </form>

        {/* Lien mot de passe oublié */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Mot de passe oublié ?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Réinitialisez-le ici
          </a>
        </p>
      </div>
    </div>
>>>>>>> Stashed changes
  );
};

export default LoginForm;
