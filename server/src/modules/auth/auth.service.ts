import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupReqDTO } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import * as bcrypt from 'bcrypt';
import { LoginReqDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(singUpPayload: SignupReqDTO): Promise<{
    message: string;
  }> {
    console.log('🚀 ~ AuthService ~ signUp ~ singUpPayload:', singUpPayload);

    const salt = 10;

    const hashedPassword = await bcrypt.hash(singUpPayload.password, salt);

    console.log('🚀 ~ AuthService ~ signUp ~ hashedPassword:', hashedPassword);

    const user = this.userRepository.create({
      name: singUpPayload.name,
      email: singUpPayload.email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return {
      message: 'User Created Successfully',
    };
  }

  async login(loginPayload: LoginReqDTO): Promise<{
    token: string;
  }> {
    console.log('🚀 ~ AuthService ~ login ~ loginPayload:', loginPayload);

    const user = await this.userRepository.findOne({
      where: { email: loginPayload.email },
    });
    console.log('🚀 ~ AuthService ~ login ~ user:', user);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const comparePassword = await bcrypt.compare(
      loginPayload.password,
      user.password,
    );

    if (!comparePassword) {
      throw new UnauthorizedException('Password not match');
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(jwtPayload);

    return {
      token,
    };
  }
}
