import { Test } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { INestApplication } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';

async function createNestApp(...gateway: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateway,
  }).compile();

  return testingModule.createNestApplication();
}

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeAll(async () => {
    app = await createNestApp(ChatGateway);
    gateway = app.get<ChatGateway>(ChatGateway);

    ioClient = io('http://localhost:3000', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });

    app.listen(3000);
  });

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ChatGateway],
  //   }).compile();

  //   gateway = module.get<ChatGateway>(ChatGateway);
  // });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit "pong" on "ping"', async () => {
    ioClient.connect();
    ioClient.emit('ping', 'hello world');
    await new Promise<void>((resolve: any) => {
      ioClient.on('connect', () => {
        console.log('connected!');
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('hello world');
        resolve();
      });
    });

    ioClient.disconnect();
  });
});
