import { createContext } from 'react';
import IAuth from "dealer_common/interfaces/IAuth";

export interface IAuthContext {
    auth: IAuth | null,
    setAuth: (value: IAuth | null) => any
}

export const AuthContext = createContext<IAuthContext>({ auth: null, setAuth: (value) => null });