import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import photo from '../assets/photo.jpg';
const RegisterForm = () => {
  // Configuration de Formik
  const formik = useFormik({
    initialValues: {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
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
        .oneOf([Yup.ref("mot de passe"), null], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
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
                  name="Nom"
                  placeholder="Entrez votre nom"
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
                  name="prénom"
                  placeholder="Entrez votre prénom"
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
                name="Email"
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

            {/* Terms */}
          
            {formik.touched.terms && formik.errors.terms && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.terms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition"
            >
              
Inscrivez-vous 
            </button>
          </form>
        </div>
      </div>
  );
};

export default RegisterForm;
