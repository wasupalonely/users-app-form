import React from "react";
import { useField } from "formik";

const FormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      {props.type === "select" ? (
        <select
          {...field}
          {...props}
          className={`block w-full p-2 border ${
            errorText ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        >
          {props.children}
        </select>
      ) : props.type === "textarea" ? (
        <textarea
          {...field}
          {...props}
          className={`block w-full p-2 border ${
            errorText ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        />
      ) : (
        <input
          {...field}
          {...props}
          className={`block w-full p-2 border ${
            errorText ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        />
      )}

      {errorText && <p className="error-message">{errorText}</p>}
    </div>
  );
};

export default FormField;
