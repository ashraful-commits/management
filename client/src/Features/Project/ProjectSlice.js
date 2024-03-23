import { createSlice } from "@reduxjs/toolkit";
import {
  AddMoreFile,
  createProject,
  deleteFiles,
  deleteProject,
  fileDownloadFunc,
  getAllProject,
  getSingleProject,
  permissionUpdate,
  projectStatusUpdate,
  updateCommissionRate,
  updateProject,
  updateSalesCommissionRate,
} from "./ProjectApi";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: [],
    error: null,
    loader: false,
    message: null,
    singleProject: null,
    downloadLink: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //=========================================create project
    builder
      .addCase(createProject.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loader = false;
        state.project.push(action.payload.project);
        state.message = action.payload.message;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //==================================================get all project
      .addCase(getAllProject.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.project = action.payload.project;
        state.loader = false;
      })
      .addCase(getAllProject.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loader = false;
      })
      //===================================================== update project
      .addCase(updateProject.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loader = false;
        state.project[
          state.project.findIndex(
            (item) => item._id === action.payload.project._id
          )
        ] = action.payload.project;
        state.message = action.payload.message;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=======================================================delete project
      .addCase(deleteProject.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loader = false;
        state.project = state.project.filter(
          (item) => item._id !== action.payload.project._id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //===================================================== permission update
      .addCase(permissionUpdate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(permissionUpdate.fulfilled, (state, action) => {
        state.loader = false;
        state.project[
          state.project.findIndex(
            (item) => item._id === action.payload.project._id
          )
        ] = action.payload.project;
        state.message = action.payload.message;
      })
      .addCase(permissionUpdate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //====================================================== project status
      .addCase(projectStatusUpdate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(projectStatusUpdate.fulfilled, (state, action) => {
        state.loader = false;
        state.project[
          state.project.findIndex(
            (item) => item._id === action.payload.project._id
          )
        ] = action.payload.project;
        state.message = action.payload.message;
      })
      .addCase(projectStatusUpdate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //===========================================================get single project
      .addCase(getSingleProject.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.loader = false;
        state.singleProject = action.payload.project;

        state.message = action.payload.message;
      })
      .addCase(getSingleProject.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=========================================================update commission rate
      .addCase(updateCommissionRate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateCommissionRate.fulfilled, (state, action) => {
        state.loader = false;
        state.project[
          state.project.findIndex(
            (item) => item._id === action.payload.project._id
          )
        ] = action.payload.project;

        state.message = action.payload.message;
      })
      .addCase(updateCommissionRate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(updateSalesCommissionRate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateSalesCommissionRate.fulfilled, (state, action) => {
        state.loader = false;
        state.project[
          state.project.findIndex(
            (item) => item._id === action.payload.project._id
          )
        ] = action.payload.project;

        state.message = action.payload.message;
      })
      .addCase(updateSalesCommissionRate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //===========================================================file download
      .addCase(fileDownloadFunc.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(fileDownloadFunc.fulfilled, (state, action) => {
        state.loader = false;
        state.downloadLink = action.payload.downloadUrl;

        state.message = action.payload.message;
      })
      .addCase(fileDownloadFunc.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(AddMoreFile.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(AddMoreFile.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(AddMoreFile.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(deleteFiles.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteFiles.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(deleteFiles.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      });
  },
});
//===============================================================export
export const getAllProjectState = (state) => state.Project;
export const { setMessageEmpty } = projectSlice.actions;
export default projectSlice.reducer;
