import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";

//=========================================================createProject
export const createProject = createAsyncThunk(
  "project/createProject",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/project`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================get all project
export const getAllProject = createAsyncThunk(
  "project/getAllProject",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/project/`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================== update project
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/project/${data.id}`,
        data.formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//==============================================================delete project
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/project/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================get single project
export const getSingleProject = createAsyncThunk(
  "project/getSingleProject",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/project/${id}`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//============================================================= project permission update
export const permissionUpdate = createAsyncThunk(
  "project/permissionUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/project/${data.id}`,
        { status: !data.status },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//===============================================================project status update
export const projectStatusUpdate = createAsyncThunk(
  "project/projectStatusUpdate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/project/projectStatusUpdate/${data.id}`,
        { projectStatus: data.projectStatus },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================== project commission update
export const updateCommissionRate = createAsyncThunk(
  "project/updateCommissionRate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/project/commissionRate/${data.id}`,
        { commissionRate: data.commissionRate },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//=============================================================== project commission update
export const updateSalesCommissionRate = createAsyncThunk(
  "project/updateSalesCommissionRate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/v1/project/salescommissionRate/${data.id}`,
        { salesCommissionRate: data.salesCommissionRate },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//==================================================================file download
export const fileDownloadFunc = createAsyncThunk(
  "project/fileDownload",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/project/file/${data.file}/${data.fileFormat}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//=============================================================delete files
export const deleteFiles = createAsyncThunk(
  "project/deleteFiles",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/project/deletefile/${data.id}`,
        { file: data.file },
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
//=============================================================delete files
export const AddMoreFile = createAsyncThunk(
  "project/AddMoreFile",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/project/addmorefile/${data.id}`,
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
