import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class CreateShortUrlDto {
    @ApiProperty({ type: String, required: true, example: 'https://docs.nestjs.com/openapi/introduction' })
    @IsNotEmpty()
    @IsUrl()
    originalUrl: string;

    short: string;

    shortUrlId: string;
}
