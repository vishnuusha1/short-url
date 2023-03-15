import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) { }

  @Post()
  async create(@Body() createShortUrlDto: CreateShortUrlDto) {
    const result = await this.shortUrlService.create(createShortUrlDto);
    return {
      shorturl: result.short
    }
  }

  @Get(':shorturl')
  findOne(@Param('shorturl') shorturl: string) {
    return this.shortUrlService.getOrginalUrl(shorturl);
  }

}
