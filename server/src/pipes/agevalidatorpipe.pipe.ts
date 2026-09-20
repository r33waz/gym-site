import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AgevalidatorpipePipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value < 16) {
      throw new BadRequestException({
        message: 'Age must be grater then 16',
        status: 400,
      });
    }
  }
}
