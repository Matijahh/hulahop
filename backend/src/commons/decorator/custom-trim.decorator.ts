import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export function Trim() {
  return applyDecorators(Transform(({ value }) => value.trim()));
}
