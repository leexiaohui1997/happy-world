import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListPointsDto {
  @ApiPropertyOptional({ description: '按区域ID筛选' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  areaId?: number;
}
