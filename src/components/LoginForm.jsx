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
    <div className="flex flex-col lg:flex-row w-11/12 max-w-5xl py-8 bg-white shadow rounded-lg overflow-hidden mt-12">
      {/* Section gauche */}
      <div
        className="lg:w-1/2 w-full h-auto lg:h-auto bg-cover bg-center"
        style={{
          backgroundImage: `url('${photo}')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Section droite */}
      <div className="lg:w-1/2 w-full p-6 sm:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          Connectez-Vous
        </h2>
        <p className="text-sm lg:text-base text-gray-600 mb-6">
          We Miss You ...
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

          {/* Remember Me & Forgot Password Links */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <input type="checkbox" name="rememberMe" className="mr-2" />
              <label className="text-sm text-gray-600">Remember Me</label>
            </div>
            <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
              Forgot Password?
            </a>
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
