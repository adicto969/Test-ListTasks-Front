import { authenticationService } from "../services/authentication.service";

export function handleResponse(response) {

    if ([401, 403].indexOf(response.status) >= 0 ) {
        authenticationService.logout();
    }

    return response;
    
}