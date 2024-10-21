import { RoleService } from '@/account/application/role.service';
import { CustomAuthGuard } from '@/common/auth/guards/custom-auth.guard';
import { ProjectsGuard } from '@/common/auth/guards/projects.guard';
import { RolesGuard } from '@/common/auth/guards/roles.guard';
import { RequireProjects } from '@/common/decorators/require-projects.decorator';
import { RequireRoles } from '@/common/decorators/require-roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateRoleRequestDto,
  ProjectEnum,
  RoleEnum,
  RoleModel,
  UpdateRoleRequestDto,
} from '@packages/sheared';

@ApiTags('권한 관리')
@Controller('api/role')
@UseGuards(CustomAuthGuard, RolesGuard, ProjectsGuard)
@ApiBearerAuth('accessToken')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '권한 등록' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Post('/register')
  async register(@Body() dto: CreateRoleRequestDto): Promise<RoleModel> {
    return await this.roleService.register(dto);
  }

  @ApiOperation({ summary: '권한 검색' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Get('/list')
  async getList(): Promise<RoleModel[]> {
    return await this.roleService.getList();
  }

  @ApiOperation({ summary: '권한 수정' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Put('/update')
  async update(@Body() dto: UpdateRoleRequestDto): Promise<boolean> {
    return await this.roleService.update(dto);
  }
  @ApiOperation({ summary: '권한 삭제' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.roleService.delete(id);
  }
}
