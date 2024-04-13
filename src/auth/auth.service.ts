import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async authRegister(registerUserDto: RegisterUserDto): Promise<User> {

        return await this.userRepository.save({ ...registerUserDto });
    }

}
