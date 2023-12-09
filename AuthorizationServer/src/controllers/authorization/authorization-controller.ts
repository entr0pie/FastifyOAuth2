import IOAuthTokenService from "../../services/security/tokens/application/oauth-token-service-interface";
import IUserTokenService from "../../services/security/tokens/user/user-token-service-interface";

export default class AuthorizationController {
    constructor(
        private userTokenService: IUserTokenService,
        private oauthTokenService: IOAuthTokenService
    ) {}
}