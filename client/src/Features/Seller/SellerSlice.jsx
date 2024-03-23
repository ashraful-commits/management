import { createSlice } from "@reduxjs/toolkit";
import {
  AddSalePerson,
  LoggedInSeller,
  LogoutSeller,
  SellerLogin,
  SellerRegistration,
  deleteSeller,
  getAllSeller,
  getSingleSalesSeller,
  getSingleSeller,
  updateSeller,
  updateSellerRole,
  updateSellerStatus,
} from "./SellerApi";

const SellerSlice = createSlice({
  name: "seller",
  initialState: {
    seller: [],
    error: null,
    loader: false,
    message: null,
    singleSeller: null,
    singleSales: null,
    loginInSeller: localStorage.getItem("Seller")
      ? JSON.parse(localStorage.getItem("Seller"))
      : null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //===================================seller registration
    builder
      .addCase(SellerRegistration.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(SellerRegistration.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(SellerRegistration.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=====================================================add salesperson
      .addCase(AddSalePerson.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(AddSalePerson.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.singleSeller.salesPerson.push(action.payload.seller);
      })
      .addCase(AddSalePerson.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=======================================================seller login
      .addCase(SellerLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(SellerLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        localStorage.setItem("Seller", JSON.stringify(action.payload.seller));
      })
      .addCase(SellerLogin.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
      })
      //=======================================================logged In Seller
      .addCase(LoggedInSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(LoggedInSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.loginInSeller = action.payload.seller;
        state.message = action.payload.message;
      })
      .addCase(LoggedInSeller.rejected, (state, action) => {
        state.loader = false;
      })
      //======================================================= logout seller
      .addCase(LogoutSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(LogoutSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(LogoutSeller.rejected, (state, action) => {
        state.loader = false;
      })
      //=========================================================get all seller
      .addCase(getAllSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.seller = action.payload.seller;
        state.message = action.payload.message;
      })
      .addCase(getAllSeller.rejected, (state, action) => {
        state.loader = false;
      })
      //======================================================= update seller role
      .addCase(updateSellerRole.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateSellerRole.fulfilled, (state, action) => {
        state.loader = false;
        state.seller[
          state.seller.findIndex(
            (item) => item._id === action.payload?.seller?._id
          )
        ] = action.payload.seller;
        state.message = action.payload.message;
      })
      .addCase(updateSellerRole.rejected, (state, action) => {
        state.loader = false;
      })
      //==========================================================get single seller
      .addCase(getSingleSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSingleSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.singleSeller = action.payload.seller;
        state.message = action.payload.message;
      })
      .addCase(getSingleSeller.rejected, (state, action) => {
        state.loader = false;
      })
      .addCase(getSingleSalesSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSingleSalesSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.singleSales = action.payload.seller;
        state.message = action.payload.message;
      })
      .addCase(getSingleSalesSeller.rejected, (state, action) => {
        state.loader = false;
      })
      //========================================================= update seller status
      .addCase(updateSellerStatus.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        state.loader = false;
        state.seller[
          state.seller.findIndex(
            (item) => item._id === action.payload?.seller?._id
          )
        ] = action.payload.seller;
        state.message = action.payload.message;
      })
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.loader = false;
      })
      //=========================================================delete seller
      .addCase(deleteSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.seller = state.seller.filter(
          (item) => item._id !== action?.payload?.seller._id
        );
        state.loginInSeller = {
          ...state.loginInSeller,
          salesPerson: state.loginInSeller.salesPerson.filter(
            (item) => item._id !== action.payload.seller._id
          ),
        };
        state.message = action.payload.message;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loader = false;
      })
      //==================================================== update seller
      .addCase(updateSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.seller[
          state.seller.findIndex(
            (item) => item._id === action.payload?.seller?._id
          )
        ] = action.payload.seller;
        state.message = action.payload.message;
        state.loginInSeller.salesPerson[
          state.loginInSeller.salesPerson.findIndex(
            (item) => item._id === action.payload?.seller?._id
          )
        ] = action.payload.seller;
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.loader = false;
      });
  },
});
//=============================================================export
export const loginInSeller = (state) => state.loginInSeller;
export const getAllSellerState = (state) => state.Seller;
export const { setMessageEmpty } = SellerSlice.actions;
export default SellerSlice.reducer;
