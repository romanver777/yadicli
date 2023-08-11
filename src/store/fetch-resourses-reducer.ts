import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TData } from "../components/page-disk/data-types";

export const fetchResourses = createAsyncThunk<
  TData,
  { token: string; path: string; limit: number },
  { rejectValue: string }
>("fetchResourses", async (data, thunkApi) => {
  try {
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${data.path}&limit=${data.limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `OAuth ${data.token}`,
        },
      }
    );
    if (!response.ok) {
      return thunkApi.rejectWithValue("Что-то пошло не так...");
    }

    return response.json();
  } catch (error) {
    return thunkApi.rejectWithValue("Что-то пошло не так...");
  }
});

export interface IResourses {
  data: TData | null;
  loading: boolean;
  error: string | null;
}

const initialState: IResourses = {
  data: null,
  loading: false,
  error: null,
};

export const fetchResoursesSlice = createSlice({
  name: "fetch-resourses",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchResourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchResourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export const { clearData } = fetchResoursesSlice.actions;
export default fetchResoursesSlice.reducer;
