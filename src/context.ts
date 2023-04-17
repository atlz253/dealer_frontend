import { createContext } from 'react';
import IAuth from "audio_diler_common/interfaces/IAuth";

export interface IAuthContext {
    auth: IAuth | null,
    setAuth: (value: IAuth | null) => any
}

export const AuthContext = createContext<IAuthContext>({ auth: null, setAuth: (value) => null });