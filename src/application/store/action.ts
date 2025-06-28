import { LoginType, User } from "../../domain/types/redux";

export const SetLoading = "setLoading" as const;
export const LogIn = "logIn" as const;
export const LogOut = "logOut" as const;
export const RestoreAuth = "restoreAuth" as const;
export const InitializeComplete = "initializeComplete" as const;

// Favorite Action Constants
export const AddToFavorites = "addToFavorites" as const;
export const RemoveFromFavorites = "removeFromFavorites" as const;
export const RestoreFavorites = "restoreFavorites" as const;
export const SetFavoriteLoading = "setFavoriteLoading" as const;

export const setLoading = ({ isLoading }: { isLoading: boolean }) => {
    return {
        type: SetLoading,
        payload: {
            isLoading
        }
    } as const;
};

export const logIn = ({ user, accessToken, refreshToken }: LoginType) => {
    return {
        type: LogIn,
        payload: {
            user,
            accessToken,
            refreshToken
        },
    } as const;
};

export const logOut = () => ({
    type: LogOut
} as const);

export const restoreAuth = ({ user, accessToken, refreshToken }: LoginType) => ({
    type: RestoreAuth,
    payload: {
        user,
        accessToken,
        refreshToken
    }
} as const);

export const initializeComplete = () => ({
    type: InitializeComplete
} as const);

// Favorite Action Creators
export const addToFavorites = ({ productId }: { productId: number }) => ({
    type: AddToFavorites,
    payload: {
        productId
    }
} as const);

export const removeFromFavorites = ({ productId }: { productId: number }) => ({
    type: RemoveFromFavorites,
    payload: {
        productId
    }
} as const);

export const restoreFavorites = ({ favoriteIds }: { favoriteIds: number[] }) => ({
    type: RestoreFavorites,
    payload: {
        favoriteIds
    }
} as const);

export const setFavoriteLoading = ({ isLoading }: { isLoading: boolean }) => ({
    type: SetFavoriteLoading,
    payload: {
        isLoading
    }
} as const);

// Action Types
export type SetLoadingAction = ReturnType<typeof setLoading>;
export type LoginAction = ReturnType<typeof logIn>;
export type LogoutAction = ReturnType<typeof logOut>;
export type RestoreAuthAction = ReturnType<typeof restoreAuth>;
export type InitializeCompleteAction = ReturnType<typeof initializeComplete>;

// Favorite Action Types
export type AddToFavoritesAction = ReturnType<typeof addToFavorites>;
export type RemoveFromFavoritesAction = ReturnType<typeof removeFromFavorites>;
export type RestoreFavoritesAction = ReturnType<typeof restoreFavorites>;
export type SetFavoriteLoadingAction = ReturnType<typeof setFavoriteLoading>;

export type AuthActionTypes = SetLoadingAction | LoginAction | LogoutAction | RestoreAuthAction | InitializeCompleteAction;
export type FavoriteActionTypes = AddToFavoritesAction | RemoveFromFavoritesAction | RestoreFavoritesAction | SetFavoriteLoadingAction;
export type AllActionTypes = AuthActionTypes | FavoriteActionTypes;
