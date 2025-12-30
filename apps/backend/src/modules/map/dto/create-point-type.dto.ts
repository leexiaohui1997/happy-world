import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePointTypeDto {
  @ApiProperty({ description: '地形名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '地形颜色', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ description: '地形图标', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: '生成概率，整数，默认值为1', default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  rate: number = 1;
}
