import { request, gql } from "graphql-request";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/graphql";

// Queries
export const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      id
      CountryCode
      CountryName
    }
  }
`;

export const TYPE_DOCUMENTS_QUERY = gql`
  query TypeDocuments {
    typeDocuments {
      id
      NameTypeDocument
    }
  }
`;

export const CHECK_USERNAME_QUERY = gql`
  query CheckUsernameExists($username: String!) {
    checkUsernameExists(username: $username)
  }
`;

export const CHECK_EMAIL_QUERY = gql`
  query CheckEmailExists($email: String!) {
    checkEmailExists(email: $email)
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($registerUserInput: RegisterUserInput!) {
    registerUser(registerUserInput: $registerUserInput) {
      id
      username
      email
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      Name
      LastName
      IsMilitar
      TimeCreate
      isTemporal
      username
      email
      emailVerified
      verificationToken
      documents {
        DateExpedition
        Document
        PlaceExpedition
        TypeDocumentId
      }
      contactInfo {
        Address
        CellPhone
        City
        country {
          CountryCode
          CountryName
        }
        EmergencyName
        EmergencyPhone
        Phone
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      Name
      LastName
      IsMilitar
      TimeCreate
      isTemporal
      username
      email
      emailVerified
      verificationToken
      documents {
        DateExpedition
        Document
        PlaceExpedition
        TypeDocumentId
        UserId
        typeDocument {
          NameTypeDocument
        }
      }
      contactInfo {
        Address
        CellPhone
        City
        country {
          CountryName
          CountryCode
        }
        EmergencyName
        EmergencyPhone
        id
        Phone
        UserId
      }
    }
  }
`;

export const fetchCountries = async () => {
  try {
    const data = await request(API_URL, COUNTRIES_QUERY);
    return data.countries;
  } catch (error) {
    console.error("Error al obtener países:", error);
    throw error;
  }
};

export const fetchTypeDocuments = async () => {
  try {
    const data = await request(API_URL, TYPE_DOCUMENTS_QUERY);
    return data.typeDocuments;
  } catch (error) {
    console.error("Error al obtener tipos de documento:", error);
    throw error;
  }
};

export const checkUserExists = async (username) => {
  try {
    const data = await request(API_URL, CHECK_USERNAME_QUERY, { username });
    return data.checkUsernameExists;
  } catch (error) {
    console.error("Error al verificar username:", error);
    return false;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const data = await request(API_URL, CHECK_EMAIL_QUERY, { email });
    return data.checkEmailExists;
  } catch (error) {
    console.error("Error al verificar email:", error);
    return false;
  }
};

export const registerUser = async (userData) => {
  try {
    const data = await request(API_URL, REGISTER_USER_MUTATION, {
      registerUserInput: userData,
    });
    return data.registerUser;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const data = await request(API_URL, GET_ALL_USERS);
    return data.users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  const data = await request(API_URL, GET_USER_BY_ID, { userId });
  return data.user;
};
