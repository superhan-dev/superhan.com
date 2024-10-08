import { Project } from '@/domain/project/model/project';
import { AppModule } from '@/module/app.module';
import { CreateProjectRequestDto } from '@/presentation/dto/project/request/create-project.request.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectRepository } from './project.repository';

describe('ProjectRepository Test', () => {
  let projectRepository: ProjectRepository;
  let repositoryMock: jest.Mocked<Repository<ProjectEntity>>;
  let dataSource: DataSource;

  beforeEach(async () => {
    repositoryMock = {
      create: jest.fn(), // create 메서드를 명시적으로 모킹
      save: jest.fn(), // save 메서드를 명시적으로 모킹
    } as unknown as jest.Mocked<Repository<ProjectEntity>>;

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([ProjectEntity])],
      providers: [
        ProjectRepository,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();
    projectRepository = module.get<ProjectRepository>(ProjectRepository);
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('create', () => {
    it('create 호출 테스트', async () => {
      const uniqueName = `Project-${Date.now().toString().slice(-5)}`; // 20자 이하로 유지
      const dto: CreateProjectRequestDto = { name: uniqueName };

      // 이렇게 하면 실제 sql 호출은 아니지만 create method를 호출하고 결과가 반환되는 것을 확인할 수 있다.
      // 하지만 실제 sql을 실행하지는 않았으므로 제대로된 테스트라고 할 수 없다.
      jest
        .spyOn(projectRepository, 'create')
        .mockImplementation(
          async (dto: CreateProjectRequestDto): Promise<Project> => {
            return {
              id: 1,
              name: dto.name,
            };
          }
        );
      const result = await projectRepository.create(dto);

      expect(result.name).toEqual(dto.name);
      expect(result.id).toEqual(1);
    });

    it('create DB 연동 테스트', async () => {
      const uniqueName = `Project-${Date.now().toString().slice(-5)}`; // 20자 이하로 유지
      const dto: CreateProjectRequestDto = { name: uniqueName };
      const projectRepositorySpy = jest.spyOn(projectRepository, 'create');
      const result = await projectRepository.create(dto);
      const createdProject = await projectRepository.findOneByProjectName(
        dto.name
      );

      expect(result.name).toEqual(createdProject.name);
      expect(result.id).toEqual(createdProject.id);
      expect(projectRepositorySpy).toHaveBeenCalledWith(dto);

      // Cleanup: Delete the created project from the database
      await dataSource
        .createQueryBuilder()
        .delete()
        .from(ProjectEntity)
        .where('id = :id', { id: createdProject.id })
        .execute();
    });
  });
});
