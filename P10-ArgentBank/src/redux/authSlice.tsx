import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Effectuer la requête HTTP ici
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error("Erreur lors de la connexion");
      }

      // Analyser la réponse JSON
      const data = await response.json();

      // Renvoyer les données utilisateur si l'authentification réussit
      return data.user;
    } catch (error) {
      // Gérer les erreurs, par exemple, rejeter avec la valeur de l'erreur
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginUserSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginUserSuccess, logoutUser } = authSlice.actions;

export default authSlice;
