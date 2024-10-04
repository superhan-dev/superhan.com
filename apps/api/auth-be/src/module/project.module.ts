import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCRUDFacade } from 'src/application/crud/project.crud.facade';
import { ProjectService } from 'src/domain/project/project.service';
import { ProjectEntity } from 'src/infrastructure/project/entity/project.entity';
import { ProjectRepository } from 'src/infrastructure/project/repository/project.repository';
import { ProjectController } from 'src/presentation/controller/project.controller';
import { CrudFacadeModule } from './crud.facade.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    forwardRef(() => CrudFacadeModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, ProjectCRUDFacade],
  exports: [ProjectCRUDFacade],
})
export class ProjectModule {}
