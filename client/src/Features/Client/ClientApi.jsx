import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

//=========================================================createClient
export const createClient = createAsyncThunk(
  "client/createClient",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/client`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=========================================================client Login
export const clientLogin = createAsyncThunk(
  "client/clientLogin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/client/login`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================get all client
export const getAllClient = createAsyncThunk(
  "client/getAllClient",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/client/`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================== update client
export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/client/${data.id}`,
        data.formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//==============================================================delete client
export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/client/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================get single client
export const getSingleClient = createAsyncThunk(
  "client/getSingleClient",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/client/clientId/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================= client permission update
export const permissionUpdate = createAsyncThunk(
  "client/permissionUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/client/${data.id}`,
        { status: !data.status },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const LoggedInClient = createAsyncThunk(
  "client/LoggedInClient",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/client/me`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================logout seller
export const LogoutClient = createAsyncThunk(
  "client/LogoutClient",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/client/logout`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
