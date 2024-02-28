import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import * as morgan from 'morgan';
import { AppModule } from "./app.module";
import { cors } from "./common/constants";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['error', 'warn'],
    });
    const config = new DocumentBuilder()
        .setTitle('Projects management API')
        .setDescription('An api to manage tasks, create projects and organize teamwork')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config)
    
    app.useGlobalPipes(new ValidationPipe({
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(morgan('dev'));
    app.enableCors(cors);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(AppModule.port, '0.0.0.0');
    console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();