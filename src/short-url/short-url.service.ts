import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { generateRandomString } from 'src/util/util';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { ShortUrl } from './entities/short-url.entity';

@Injectable()
export class ShortUrlService {
  constructor(@InjectModel(ShortUrl.name) private urlModel: Model<ShortUrl>,
    @Inject(ConfigService) private readonly configService: ConfigService,) { }

  /**
   * @function create
   * @description This function used to create short URl and save to entity
   * @param createShortUrlDto 
   * @returns CreateShortUrlDto
   */
  async create(createShortUrlDto: CreateShortUrlDto): Promise<CreateShortUrlDto> {
    const shortUrlId = generateRandomString();
    const shortUrl = this.configService.get('BASE_URL') + shortUrlId
    createShortUrlDto.short = shortUrl;
    createShortUrlDto.shortUrlId = shortUrlId
    const result = await this.urlModel.create(createShortUrlDto)
    return result;
  }

  /**
  * @function getShortUrl
  * @description This function used to get a orginal url by short url
  * @param shortUrl 
  * @returns string
  */
  async getOrginalUrl(shortUrl: string): Promise<string> {
    const shortUrlId = shortUrl.replace(this.configService.get('BASE_URL'), "")
    const url = await this.urlModel.findOne({ shortUrlId: shortUrlId });
    if (!url) {
      throw new Error('URL not found');
    }
    return url.originalUrl;
  }
}
