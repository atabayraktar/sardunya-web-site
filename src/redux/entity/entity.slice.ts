import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Entity } from "../../entities/Entity";
import ServiceService from "../../services/serviceService";

type EntityState = {
  entities: Entity[];
  entity: Entity;
};

const initialState: EntityState = {
  entities: [],
  entity: {
    name: "",
  },
};

export const serviceService = new ServiceService();

export const getEntites = createAsyncThunk(
  "promotions/GetPromotions",
  async () => await serviceService.GetEntities()
);
export const getEntity = createAsyncThunk(
  "promotions/GetPromotion",
  async (id: any) => await serviceService.GetEntity(id)
);

export const entitySlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEntites.pending, (state) => ({
      ...state,
      promotions: [],
    }));
    builder.addCase(getEntites.rejected, (state, action) => ({
      ...state,
      promotions: [],
    }));
    builder.addCase(getEntites.fulfilled, (state, action) => ({
      ...state,
      promotions: action.payload,
    }));

    builder.addCase(getEntity.pending, (state) => ({
      ...state,
      entity: {
        name: "",
      },
    }));
    builder.addCase(getEntity.rejected, (state, action) => ({
      ...state,
      entity: {
        name: "",
      },
    }));
    builder.addCase(getEntity.fulfilled, (state, action) => ({
      ...state,
      entity: action.payload,
    }));
  },
});

export default entitySlice.reducer;
