import { createContext } from "react";
import { AcessTokenPayloadDTO } from "../components/models/auth";

export type ContextTokenType = {
    contextTokenPayload: AcessTokenPayloadDTO | undefined;
    setContextTokenPayload: (
        accessTokenPayload: AcessTokenPayloadDTO | undefined) => void;

};

export const ContextToken = createContext<ContextTokenType>({
    contextTokenPayload: undefined,
    setContextTokenPayload: () => { },
});
