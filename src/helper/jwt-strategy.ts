//pengenalan

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

type Payload = { //klo ada ini role nya //payload harus sm dengan yg ada di auth service
    id: number
    name: string
    role: string
}
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_KEY') || 'secret-word',
        });
    }

    async validate(payload: Payload) {
        return payload
    }
    
}