import { forwardRef, Module } from '@nestjs/common';
import { CRUDFacadeFactory } from '@/application/crud/crud.facade.factory';
import { ProjectModule } from './project.module';

@Module({
  imports: [forwardRef(() => ProjectModule)],
  providers: [CRUDFacadeFactory],
  exports: [CRUDFacadeFactory],
})
export class CrudFacadeModule {}
