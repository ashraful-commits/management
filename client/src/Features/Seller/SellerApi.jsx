import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";
//=========================================================base url

//=======================================================sellerRegistration
export const SellerRegistration = createAsyncThunk(
  "seller/SellerRegistration",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/seller`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//========================================================add sales Person
export const AddSalePerson = createAsyncThunk(
  "seller/AddSalePerson",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/seller`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//======================================================== update seller
export const updateSeller = createAsyncThunk(
  "seller/updateSeller",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/seller/sellerUpdate/${data.id}`,
        data.formData,
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
//========================================================= seller Login
export const SellerLogin = createAsyncThunk(
  "seller/SellerLogin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/seller/login`,
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================ loggedIn seller data
export const LoggedInSeller = createAsyncThunk(
  "seller/LoggedInSeller",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/seller/me`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================logout seller
export const LogoutSeller = createAsyncThunk(
  "seller/LogoutSeller",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/seller/logout`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//===========================================================get all seller
export const getAllSeller = createAsyncThunk(
  "seller/getAllSeller",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/seller`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//========================================================= update seller Role
export const updateSellerRole = createAsyncThunk(
  "seller/updateSellerRole",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/seller/${data.id}`,
        { role: data.role },
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
//======================================================== update sellerStatus
export const updateSellerStatus = createAsyncThunk(
  "seller/updateSellerStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/seller/${data.id}`,
        { status: !data.status },
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
//========================================================== delete seller
export const deleteSeller = createAsyncThunk(
  "seller/deleteSeller",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/seller/${data.id}/${data.sellerId}`,

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
//========================================================get single seller
export const getSingleSeller = createAsyncThunk(
  "seller/getSingleSeller",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/seller/${id}`,

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
//========================================================get single seller
export const getSingleSalesSeller = createAsyncThunk(
  "seller/getSingleSalesSeller",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/seller/salesPerson/${id}`,

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
