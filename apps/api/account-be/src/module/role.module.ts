import { RoleCrudFacade } from '@/application/crud/role.crud.facade';
import { RoleDomainService } from '@/domain/role/service/role.domain.service';
import { RoleEntity } from '@/infrastructure/role/entity/role.entity';
import { RoleRepository } from '@/infrastructure/role/repository/role.repository';
import { RoleController } from '@/presentation/controller/role.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudFacadeModule } from './crud.facade.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    forwardRef(() => CrudFacadeModule),
  ],
  controllers: [RoleController],
  providers: [RoleDomainService, RoleRepository, RoleCrudFacade],
  exports: [RoleCrudFacade, RoleDomainService, RoleRepository],
})
export class RoleModule {}
