import { ApiOperation, ApiResponseProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiResponseProperty({
    example: ' sdrufrs-43rwef-f4wr-w4fg4',
    format: 'v4',
  })
  public id: string;

  @ApiResponseProperty({
    example: 'user@gmail.com',
  })
  public email: string;

  @ApiResponseProperty({
    example: 'user',
    format: 'string',
  })
  public name: string;

  @ApiResponseProperty({
    example: 'user created successfully',
    format: 'string',
  })
  public message: string;
}
