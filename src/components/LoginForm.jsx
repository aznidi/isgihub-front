// src/components/LoginForm.jsx
import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import photo from '../assets/photo.jpg';

const LoginForm = () => {
  // Configuration de Formik
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
        .required("Mot de passe requis")
    }),
    onSubmit: (values) => {
      console.log("Données soumises :", values);
      alert("Formulaire soumis avec succès !");
    },
  });

  return (
      <div className="flex flex-col lg:flex-row w-11/12 max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Section gauche */}
        <div
          className="lg:w-1/2 w-full h-60 lg:h-auto bg-cover bg-center"
          style={{
            backgroundImage: `url('${photo}')`,
          }}
        >
         
        </div>

        {/* Section droite */}
        <div className="lg:w-1/2 w-full p-6 sm:p-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Login
          </h2>
          <p className="text-sm lg:text-base text-gray-600 mb-6">
            Login to your account.
          </p>
          <form onSubmit={formik.handleSubmit}>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                placeholder="Password"
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


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
  );
};

export default LoginForm;
