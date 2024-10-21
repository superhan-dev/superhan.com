import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Test } from '@nestjs/testing';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;
  const mockFn = jest.fn();
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get(AppController);
    service = module.get(AppService);
  });

  describe('hello service', () => {
    it('return a default message', () => {
      jest.spyOn(service, 'getHello').mockReturnValue('Hello Superhan');
      expect(controller.getHello()).toEqual('Hello Superhan');
      expect(service.getHello).toHaveBeenCalledTimes(1); // service가 한번 호출됬는지 확인한다.
    });

    it('mockFn test', () => {
      mockFn.mockReturnValue('Return mock value');
      console.log('mockFn():', mockFn());

      expect(mockFn()).toEqual('Return mock value');
    });
  });
});
