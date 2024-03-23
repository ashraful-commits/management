import { createSlice } from "@reduxjs/toolkit";

import {
  LoggedInClient,
  LogoutClient,
  clientLogin,
  createClient,
  deleteClient,
  getAllClient,
  getSingleClient,
  permissionUpdate,
  updateClient,
} from "./ClientApi";

const ClientSlice = createSlice({
  name: "client",
  initialState: {
    client: [],
    error: null,
    loader: false,
    message: null,
    singleClient: null,
    clientLoginData: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //=========================================create Client
    builder
      .addCase(createClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client.push(action.payload.client);
        state.message = action.payload.message;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //==================================================get all client
      .addCase(getAllClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client = action.payload.client;
      })
      .addCase(getAllClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //===================================================== update client
      .addCase(updateClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client[
          state.client.findIndex(
            (item) => item._id === action.payload.client._id
          )
        ] = action.payload.client;
        state.message = action.payload.message;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=======================================================delete client
      .addCase(deleteClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loader = false;
        state.client = state.client.filter(
          (item) => item._id !== action.payload.client._id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //===================================================== permission update
      .addCase(permissionUpdate.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(permissionUpdate.fulfilled, (state, action) => {
        state.loader = false;
        state.client[
          state.client.findIndex(
            (item) => item._id === action.payload.client._id
          )
        ] = action.payload.client;
        state.message = action.payload.message;
      })
      .addCase(permissionUpdate.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })

      //===========================================================get single client
      .addCase(getSingleClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSingleClient.fulfilled, (state, action) => {
        state.loader = false;
        state.singleClient = action.payload.client;

        state.message = action.payload.message;
      })
      .addCase(getSingleClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=========================================================update commission rate
      .addCase(clientLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(clientLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        localStorage.setItem("Client", JSON.stringify(action.payload.client));
      })
      .addCase(clientLogin.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(LoggedInClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(LoggedInClient.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.clientLoginData = action.payload.client;
      })
      .addCase(LoggedInClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      .addCase(LogoutClient.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(LogoutClient.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(LogoutClient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      });
  },
});
//===============================================================export
export const getAllClientState = (state) => state.Client;
export const { setMessageEmpty } = ClientSlice.actions;
export default ClientSlice.reducer;
