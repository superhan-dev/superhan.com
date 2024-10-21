import { ProjectService } from '@/account/application/project.service';
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
  CreateProjectRequestDto,
  ProjectEnum,
  ProjectModel,
  RoleEnum,
  UpdateProjectRequestDto,
} from '@packages/sheared';

@ApiTags('프로젝트 관리')
@Controller('api/project')
@UseGuards(CustomAuthGuard, RolesGuard, ProjectsGuard)
@ApiBearerAuth('accessToken')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '프로젝트 등록' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Post('/register')
  async register(@Body() dto: CreateProjectRequestDto): Promise<ProjectModel> {
    return await this.projectService.register(dto);
  }


  @ApiOperation({ summary: '프로젝트 검색' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Get('/list')
  async getList(): Promise<ProjectModel[]> {
    return await this.projectService.getList();
  }


  @ApiOperation({ summary: '프로젝트 수정' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Put('/update')
  async update(@Body() dto: UpdateProjectRequestDto): Promise<boolean> {
    return await this.projectService.update(dto);
  }

  @ApiOperation({ summary: '프로젝트 삭제' })
  @RequireRoles(RoleEnum.ADMIN)
  @RequireProjects(ProjectEnum.ELYPECS)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.projectService.delete(id);
  }
}
