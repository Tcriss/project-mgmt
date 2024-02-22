import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import * as morgan from 'morgan';
import { AppModule } from "./app.module";
import { cors } from "./constants";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.use(morgan('dev'));
    app.enableCors(cors);

    await app.listen(AppModule.port);
    console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();