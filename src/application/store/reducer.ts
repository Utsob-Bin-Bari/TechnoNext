import { 
    SetLoading,
    LogIn, 
    LogOut, 
    RestoreAuth,
    InitializeComplete,
    AuthActionTypes
} from "./action";
import { AuthState } from "../../domain/types/redux";
import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../../infrastructure /adapters/authApi';
import { productApi } from '../../infrastructure /adapters/productApi';

const initialState: AuthState = {
    authentication: {
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false,
        isLoading: true,
        user: undefined,
    },
};

function authReducer(
    state: AuthState = initialState,
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

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
});

export default rootReducer;
