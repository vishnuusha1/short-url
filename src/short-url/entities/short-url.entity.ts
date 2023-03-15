import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = ShortUrl & Document;

@Schema()
export class ShortUrl {

    @Prop()
    originalUrl: string;

    @Prop()
    short: string;

    @Prop()
    shortUrlId: string;

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);