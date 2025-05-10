import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const UserDetailsModal = ({ user, isOpen, onClose, isLoading }) => {
  if (!isOpen) return null;

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", {
        locale: es,
      });
    } catch (e) {
      return "Fecha inválida";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
                <span className="ml-2">Cargando detalles...</span>
              </div>
            ) : user ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Detalles del Usuario
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.emailVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.emailVerified
                      ? "Verificado"
                      : "Pendiente de verificación"}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Información Personal
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre de Usuario</p>
                      <p className="font-medium">{user.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Correo Electrónico
                      </p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nombre Completo</p>
                      <p className="font-medium">{`${user.Name || ""} ${
                        user.LastName || ""
                      }`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Registro</p>
                      <p className="font-medium">
                        {user.TimeCreate
                          ? formatDate(user.TimeCreate)
                          : "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Información de Contacto
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Teléfono Celular</p>
                      <p className="font-medium">
                        {user.contactInfo?.CellPhone || "No disponible"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono Fijo</p>
                      <p className="font-medium">
                        {user.contactInfo?.Phone || "No disponible"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="font-medium">
                        {user.contactInfo?.Address || "No disponible"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ciudad</p>
                      <p className="font-medium">
                        {user.contactInfo?.City || "No disponible"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">País</p>
                      <p className="font-medium">
                        {user.contactInfo?.country?.CountryName ||
                          "No disponible"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <h5 className="font-medium text-gray-700 mb-2">
                      Contacto de Emergencia
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium">
                          {user.contactInfo?.EmergencyName || "No disponible"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium">
                          {user.contactInfo?.EmergencyPhone || "No disponible"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Documentos</h4>

                  {user.documents && user.documents.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tipo
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Número
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Expedición
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Lugar
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {user.documents.map((doc, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                {doc.typeDocument?.NameTypeDocument ===
                                "PASSPORT"
                                  ? "Pasaporte"
                                  : doc.typeDocument?.NameTypeDocument ||
                                    "No disponible"}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                {doc.Document || "No disponible"}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                {formatDate(doc.DateExpedition)}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                {doc.PlaceExpedition || "No disponible"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      No hay documentos registrados.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-red-500">
                Error al cargar los detalles del usuario
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
