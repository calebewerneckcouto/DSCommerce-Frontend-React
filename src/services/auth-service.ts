import QueryString from "qs";
import { AcessTokenPayloadDTO, CredentialsDTO } from "../components/models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import * as acessTokenRepository from '../localstorage/acess-token-repository';
import jwtDecode from "jwt-decode";

export function loginRequest(loginData: CredentialsDTO) {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }


    const requestBody = QueryString.stringify({ ...loginData, grant_type: "password" });

    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/oauth2/token",
        data: requestBody,
        headers
    }

    return requestBackend(config);
}

export function logout() {
    acessTokenRepository.remove();

}

export function saveAcessToken(token: string) {
    acessTokenRepository.save(token);
}


export function getAcessToken() {
    return acessTokenRepository.get();
}

export function getAcessTokenPayload(): AcessTokenPayloadDTO | undefined {
    try {
        const token = acessTokenRepository.get();
        return token == null ? undefined : (jwtDecode(token) as AcessTokenPayloadDTO);

    } catch (error) {
        return undefined;
    }
}

export function isAuthenticated(): boolean {
    let tokenPayload = getAcessTokenPayload();
    if (tokenPayload && tokenPayload.exp * 1000 > Date.now()) {
        return true;
    }
    return false;
}