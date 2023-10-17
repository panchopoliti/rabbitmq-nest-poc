import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqp://localhost:5672',
          // 'amqps://test-rabbit:testrabbit1234@b-3f2d0783-43d1-475e-a474-b2e8166b77d9.mq.us-east-1.amazonaws.com:5671',
        ],
        queue: 'Movies',
        // false = manual acknowledgement; true = automatic acknowledgment
        noAck: false,
        // Get one by one
        prefetchCount: 1,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();

  console.log('Microservice listening on port: ', 5672);
}

bootstrap();
