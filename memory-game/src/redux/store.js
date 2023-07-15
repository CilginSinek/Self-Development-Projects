import { configureStore } from "@reduxjs/toolkit";
import CardSlice from "./CardSlice/CardSlice";

export const store = configureStore({
    reducer:{
        card:CardSlice,
    },
});