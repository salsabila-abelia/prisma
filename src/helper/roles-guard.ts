//perizinan

import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate { //implements menerapkan dri interface(canActivate itu interface) extends itu menerapkan dari induk class
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(`roles`, context.getHandler()) // pertama dia mencaritahu ada atau ngga nya rolenya, klo ada maka bleh klo ngga ada maka gaboleh. dan dia bs mendeteksi semua role yg bpleh mengakses api itu apa saja dan dia menyimpan, 
        if (!roles) return true 

        const request = context.switchToHttp().getRequest() 
        const user = request.user
        return roles.includes(user?.role)
    
    }
}

export const Roles = (...roles: string[]) => {
    return SetMetadata(`roles`, roles)
}