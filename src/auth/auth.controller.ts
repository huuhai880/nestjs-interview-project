import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpMessage, ResponseDataClass } from 'src/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    authRegister(@Body() registerUserDto:RegisterUserDto): Promise<User> {
        
            
            // return new ResponseDataClass<User>(await this.authService.authRegister(registerUserDto), HttpStatus.OK, HttpMessage.OK)

          return  this.authService.authRegister(registerUserDto)

       
        
    }


}
