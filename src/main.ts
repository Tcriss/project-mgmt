import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import * as morgan from 'morgan';
import { AppModule } from "./app.module";
import { cors } from "./common/constants";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['error', 'warn'],
    });
    
    app.useGlobalPipes(new ValidationPipe({
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(morgan('dev'));
    app.enableCors(cors);

    await app.listen(AppModule.port, '0.0.0.0');
    console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();