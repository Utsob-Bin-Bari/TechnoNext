import { LoginType, User } from "../../domain/types/redux";
export const SetLoading = "setLoading" as const;
export const LogIn = "logIn" as const;
export const LogOut = "logOut" as const;
export const RestoreAuth = "restoreAuth" as const;
export const InitializeComplete = "initializeComplete" as const;


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

export type SetLoadingAction = ReturnType<typeof setLoading>;
export type LoginAction = ReturnType<typeof logIn>;
export type LogoutAction = ReturnType<typeof logOut>;
export type RestoreAuthAction = ReturnType<typeof restoreAuth>;
export type InitializeCompleteAction = ReturnType<typeof initializeComplete>;
export type AuthActionTypes = SetLoadingAction | LoginAction | LogoutAction | RestoreAuthAction | InitializeCompleteAction;
