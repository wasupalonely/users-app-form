import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormField from "./FormField";
import { registrationSchema } from "../utils/validationSchema";
import {
  fetchCountries,
  fetchTypeDocuments,
  registerUser,
} from "../services/api";

const RegistrationForm = () => {
  const [countries, setCountries] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const initialValues = {
    user: {
      username: "",
      email: "",
      Name: "",
      LastName: "",
      password: "",
      confirmPassword: "",
    },
    contactInfo: {
      CellPhone: "",
      Phone: "",
      Address: "",
      City: "",
      CountryID: "",
      EmergencyName: "",
      EmergencyPhone: "",
    },
    document: {
      TypeDocumentId: "",
      Document: "",
      DateExpedition: "",
      PlaceExpedition: "",
    },
  };

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [countriesData, documentTypesData] = await Promise.all([
          fetchCountries(),
          fetchTypeDocuments(),
        ]);

        setCountries(countriesData);
        setDocumentTypes(documentTypesData);
      } catch (error) {
        toast.error("Error al cargar datos del formulario");
        console.error("Error cargando datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFormData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const submitData = {
        user: {
          username: values.user.username,
          email: values.user.email,
          Name: values.user.Name,
          LastName: values.user.LastName,
          password: values.user.password,
        },
        contactInfo: values.contactInfo,
        document: values.document,
      };

      submitData.contactInfo.CountryID = Number(
        submitData.contactInfo.CountryID
      );
      submitData.document.TypeDocumentId = Number(
        submitData.document.TypeDocumentId
      );

      await registerUser(submitData);

      toast.success("Usuario registrado exitosamente!");
      setRegisterSuccess(true);
      resetForm();
    } catch (error) {
      toast.error(error.response.errors[0].extensions.originalError.message[0].split(".")[1]);
      console.error("Error en registro:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
        <span className="ml-2">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="form-container">
      <ToastContainer position="top-right" autoClose={5000} />

      <h1 className="form-title">Registro de Usuario</h1>

      {registerSuccess && (
        <div className="success-message">
          Usuario registrado correctamente. Puedes crear un nuevo registro.
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ isSubmitting, setFieldValue, setFieldTouched }) => (
          <Form>
            {/* SECCIÓN: INFORMACIÓN DE USUARIO */}
            <div className="mb-8">
              <h2 className="section-title">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Nombre de Usuario"
                  name="user.username"
                  type="text"
                  placeholder="Ingrese un nombre de usuario"
                  onBlur={(e) => {
                    setFieldTouched("user.username", true, true);
                  }}
                />

                <FormField
                  label="Correo Electrónico"
                  name="user.email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  onBlur={(e) => {
                    setFieldTouched("user.email", true, true);
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Nombre"
                  name="user.Name"
                  type="text"
                  placeholder="Ingrese su nombre"
                />

                <FormField
                  label="Apellido"
                  name="user.LastName"
                  type="text"
                  placeholder="Ingrese su apellido"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Contraseña"
                  name="user.password"
                  type="password"
                  placeholder="********"
                />

                <FormField
                  label="Confirmar Contraseña"
                  name="user.confirmPassword"
                  type="password"
                  placeholder="********"
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="section-title">Información de Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Teléfono Celular"
                  name="contactInfo.CellPhone"
                  type="tel"
                  placeholder="Ingrese su número de celular"
                />

                <FormField
                  label="Teléfono Fijo"
                  name="contactInfo.Phone"
                  type="tel"
                  placeholder="Ingrese su número fijo"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Dirección"
                  name="contactInfo.Address"
                  type="text"
                  placeholder="Ingrese su dirección"
                />

                <FormField
                  label="Ciudad"
                  name="contactInfo.City"
                  type="text"
                  placeholder="Ingrese su ciudad"
                />
              </div>

              <FormField
                label="País"
                name="contactInfo.CountryID"
                type="select"
              >
                <option value="">Seleccione un país</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.CountryName}
                  </option>
                ))}
              </FormField>

              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  Contacto de Emergencia
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Nombre de Contacto"
                    name="contactInfo.EmergencyName"
                    type="text"
                    placeholder="Nombre del contacto de emergencia"
                  />

                  <FormField
                    label="Teléfono de Emergencia"
                    name="contactInfo.EmergencyPhone"
                    type="tel"
                    placeholder="Teléfono del contacto de emergencia"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="section-title">Información del Documento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Tipo de Documento"
                  name="document.TypeDocumentId"
                  type="select"
                >
                  <option value="">Seleccione un tipo de documento</option>
                  {documentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.NameTypeDocument}
                    </option>
                  ))}
                </FormField>

                <FormField
                  label="Número de Documento"
                  name="document.Document"
                  type="text"
                  placeholder="Ingrese su número de documento"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Fecha de Expedición"
                  name="document.DateExpedition"
                  type="date"
                />

                <FormField
                  label="Lugar de Expedición"
                  name="document.PlaceExpedition"
                  type="text"
                  placeholder="Ciudad de expedición del documento"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Registrando...</span>
                </>
              ) : (
                "Registrar Usuario"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
