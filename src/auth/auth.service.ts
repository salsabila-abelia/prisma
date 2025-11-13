import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly bcrypt: BcryptService,
      private readonly jwt: JwtService,
    ) {}
    async auth(authDto: AuthDto) {
      try {
        const { email, password } = authDto
        const findUser = await this.prisma.user.findFirst({
          where: { email }
        })
        if (!findUser) {
          return {
            success: false,
            message: `Invalid email`,
            data: null
          }
        }

        const isMatchPassword = await this.bcrypt.comparePassword(password, findUser.password)
        if (!isMatchPassword) {
          return {
            success: false,
            message: `Invalid password`,
            data: null
          }
        }

        const token = this.jwt.sign(
          {
            id: findUser.id, name: findUser.name, role: findUser.role
          });

          return {
            success: true,
            message: `Login successful`,
            data: { token, name: findUser.name, role: findUser.role}
          }
      
        } catch (error) {
          return {
            success: false,
            message: `error when signin: ${error.message}`,
            data: null
          }
        }
    }
}