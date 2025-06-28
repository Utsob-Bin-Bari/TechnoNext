import { 
    SetLoading,
    LogIn, 
    LogOut, 
    RestoreAuth,
    InitializeComplete,
    AuthActionTypes,
    AddToFavorites,
    RemoveFromFavorites,
    RestoreFavorites,
    SetFavoriteLoading,
    FavoriteActionTypes
} from "./action";
import { AuthState, FavoriteState } from "../../domain/types/redux";
import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../../infrastructure /adapters/authApi';
import { productApi } from '../../infrastructure /adapters/productApi';

const initialAuthState: AuthState = {
    authentication: {
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false,
        isLoading: true,
        user: undefined,
    },
};

const initialFavoriteState: FavoriteState = {
    favorites: {
        favoriteIds: [],
        isLoading: false,
    },
};

function authReducer(
    state: AuthState = initialAuthState,
    action: AuthActionTypes
): AuthState {
    switch (action.type) {
        case SetLoading: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    isLoading: action.payload.isLoading,
                },
            };
        }
        case LogIn: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    user: action.payload.user,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    isAuthenticated: true,
                    isLoading: false,
                },
            };
        }
        case LogOut: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    user: undefined,
                    accessToken: "",
                    refreshToken: "",
                    isAuthenticated: false,
                    isLoading: false,
                },
            };
        }
        case RestoreAuth: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    user: action.payload.user,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    isAuthenticated: true,
                    isLoading: false,
                },
            };
        }
        case InitializeComplete: {
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    isLoading: false,
                },
            };
        }
        default:
            return state;
    }
}

function favoriteReducer(
    state: FavoriteState = initialFavoriteState,
    action: FavoriteActionTypes
): FavoriteState {
    switch (action.type) {
        case AddToFavorites: {
            const currentFavorites = state.favorites?.favoriteIds || [];
            if (currentFavorites.includes(action.payload.productId)) {
                return state; // Already in favorites
            }
            return {
                ...state,
                favorites: {
                    favoriteIds: [...currentFavorites, action.payload.productId],
                    isLoading: state.favorites?.isLoading || false,
                },
            };
        }
        case RemoveFromFavorites: {
            const currentFavorites = state.favorites?.favoriteIds || [];
            return {
                ...state,
                favorites: {
                    favoriteIds: currentFavorites.filter(id => id !== action.payload.productId),
                    isLoading: state.favorites?.isLoading || false,
                },
            };
        }
        case RestoreFavorites: {
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    favoriteIds: action.payload.favoriteIds,
                    isLoading: false,
                },
            };
        }
        case SetFavoriteLoading: {
            return {
                ...state,
                favorites: {
                    favoriteIds: state.favorites?.favoriteIds || [],
                    isLoading: action.payload.isLoading,
                },
            };
        }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    auth: authReducer,
    favorites: favoriteReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
});

export default rootReducer;
