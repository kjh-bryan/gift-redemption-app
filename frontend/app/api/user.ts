import axios from "axios";
import { SERVER_DOMAIN, getServerToken } from "./config";
import { LoginProps, RegisterProps } from "@/interfaces/types";

const GET_USERS_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user`;
const GET_USER_BY_USERNAME_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user`;
const LOGIN_USER_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user/login`;
const REGISTER_USER_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user/register`;
const DELETE_USER_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user`;

export const getAllUsers = async () => {
  return await axios.get(`${GET_USERS_ENDPOINT}`);
};
export const getUserByUsername = async (staff_pass_id: string) => {
  return await axios.get(`${GET_USER_BY_USERNAME_ENDPOINT}/${staff_pass_id}`);
};
export const registerUser = async (payload: RegisterProps) => {
  return await axios.post(`${REGISTER_USER_ENDPOINT}`, payload);
};

export const loginUser = async (payload: LoginProps) => {
  return await axios.post(`${LOGIN_USER_ENDPOINT}`, payload);
};

export const deleteUser = async (staff_pass_id: string) => {
  return await axios.delete(`${DELETE_USER_ENDPOINT}/${staff_pass_id}`, {
    headers: {
      Authorization: `Bearer ${await getServerToken()}`,
    },
  });
};
