import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  @IsNotEmpty({ message: '角色名称不能为空' })
  rolename: string;

  @ApiProperty({ description: '账号，唯一' })
  @IsString()
  @IsNotEmpty({ message: '账号不能为空' })
  @MinLength(3, { message: '账号长度至少为3个字符' })
  account: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度至少为6个字符' })
  password: string;
}
