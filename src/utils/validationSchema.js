import * as Yup from "yup";
import { checkUserExists, checkEmailExists } from "../services/api";

// Esquema de validación completo para el formulario de registro
export const registrationSchema = Yup.object({
  user: Yup.object({
    username: Yup.string()
      .required("El nombre de usuario es obligatorio")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(20, "El nombre de usuario no puede tener más de 20 caracteres")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "El nombre de usuario solo puede contener letras, números y guiones bajos"
      )
      .test(
        "unique-username",
        "Este nombre de usuario ya existe",
        async (value) => {
          if (!value) return true;
          try {
            const exists = await checkUserExists(value);
            return !exists;
          } catch (_) {
            return true;
          }
        }
      ),

    email: Yup.string()
      .required("El correo electrónico es obligatorio")
      .email("Formato de correo electrónico inválido")
      .test(
        "unique-email",
        "Este correo electrónico ya está registrado",
        async (value) => {
          if (!value) return true;
          try {
            const exists = await checkEmailExists(value);
            return !exists;
          } catch (_) {
            return true;
          }
        }
      ),

    Name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres"),

    LastName: Yup.string()
      .required("El apellido es obligatorio")
      .min(2, "El apellido debe tener al menos 2 caracteres"),

    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirma tu contraseña"),
  }),

  contactInfo: Yup.object({
    CellPhone: Yup.string()
      .required("El número de celular es obligatorio")
      .matches(/^\d{7,15}$/, "Número de celular inválido"),

    Phone: Yup.string()
      .required("El número de teléfono es obligatorio")
      .matches(/^\d{7,15}$/, "Número de teléfono inválido"),

    Address: Yup.string()
      .required("La dirección es obligatoria")
      .matches(/^.*#.*$/, "'La dirección debe incluir el símbolo '#'")
      .min(5, "La dirección debe tener al menos 5 caracteres"),

    City: Yup.string().required("La ciudad es obligatoria"),

    CountryID: Yup.number()
      .required("El país es obligatorio")
      .positive("Selecciona un país válido"),

    EmergencyName: Yup.string().required(
      "El nombre de contacto de emergencia es obligatorio"
    ),

    EmergencyPhone: Yup.string()
      .required("El teléfono de emergencia es obligatorio")
      .matches(/^\d{7,15}$/, "Número de teléfono inválido"),
  }),

  document: Yup.object({
    TypeDocumentId: Yup.number()
      .required("El tipo de documento es obligatorio")
      .positive("Selecciona un tipo de documento válido"),

    Document: Yup.string()
      .required("El número de documento es obligatorio")
      .matches(/^\d{6,20}$/, "Número de documento inválido"),

    DateExpedition: Yup.date()
      .required("La fecha de expedición es obligatoria")
      .max(new Date(), "La fecha de expedición no puede ser futura"),

    PlaceExpedition: Yup.string().required(
      "El lugar de expedición es obligatorio"
    ),
  }),
});
