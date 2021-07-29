import { authenticationService } from "../services/authentication.service";

export function authHeader() {
    const token = authenticationService.token;

    if (token) {
        return { Authorization: `Bearer ${token}`};
    }

    return {};
}