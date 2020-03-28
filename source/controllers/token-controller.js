const jwtDecode = require('jwt-decode');

class TokenController {
    constructor(
        {
            logger, config, tokenService, userService,
        },
    ) {
        this.logger = logger;
        this.config = config;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    async findOne(query) {
        return this.tokenService.findOne(query);
    }

    async findUserByToken(rawToken) {
        const token = await this.tokenService.findOne({ rawToken });
        return this.userService.findById(token.user);
    }

    async updateAccessibleRoutes(rawToken, role) {
        role = role.toLowerCase();

        const { _id, data } = await this.tokenService.findOne({ rawToken });
        data.accessibleRoutes.push(role);
        data[role] = true;

        return this.tokenService.updateOne(_id, { data });
    }

    async accessControl(routePrefix, rawToken) {
        const token = jwtDecode.decode(rawToken);
        if (routePrefix === 'app') return true;
        return token.accessibleRoutes.includes(routePrefix) && token.isActive;
    }
}

module.exports = TokenController;
