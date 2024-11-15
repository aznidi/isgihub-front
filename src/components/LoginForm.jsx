// src/components/LoginForm.jsx
import React from 'react';
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
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitting", values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 mb-0">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Entrez votre email"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium">Mot de passe</label>
            <Field
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold p-2 rounded-xl w-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>

          
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
