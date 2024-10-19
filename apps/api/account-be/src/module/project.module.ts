import { ProjectCrudFacade } from '@/application/crud/project.crud.facade';
import { ProjectDomainService } from '@/domain/project/service/project.domain.service';
import { ProjectEntity } from '@/infrastructure/project/entity/project.entity';
import { ProjectRepository } from '@/infrastructure/project/repository/project.repository';
import { ProjectController } from '@/presentation/controller/project.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudFacadeModule } from './crud.facade.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    forwardRef(() => CrudFacadeModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectDomainService, ProjectRepository, ProjectCrudFacade],
  exports: [ProjectCrudFacade, ProjectDomainService, ProjectRepository],
})
export class ProjectModule {}
