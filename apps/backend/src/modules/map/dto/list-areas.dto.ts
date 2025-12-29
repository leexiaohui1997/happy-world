import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListAreasDto {
  @ApiPropertyOptional({ description: '按星球ID筛选' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  globalId?: number;
}
