import { forwardRef, Module } from '@nestjs/common';
import { CrudFacadeFactory } from '@/application/crud/crud.facade.factory';
import { ProjectModule } from './project.module';
import { RoleModule } from './role.module';

@Module({
  imports: [forwardRef(() => ProjectModule), forwardRef(() => RoleModule)],
  providers: [CrudFacadeFactory],
  exports: [CrudFacadeFactory],
})
export class CrudFacadeModule {}
