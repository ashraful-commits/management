import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SellerSlice from "../Features/Seller/SellerSlice";
import ClientSlice from "../Features/Client/ClientSlice";
import CompanySlice from "../Features/Company/CompanySlice";
import projectSlice from "./../Features/Project/ProjectSlice";

const store = configureStore({
  reducer: {
    Seller: SellerSlice,
    Project: projectSlice,
    Client: ClientSlice,
    Company: CompanySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
//===================================store export
export default store;
