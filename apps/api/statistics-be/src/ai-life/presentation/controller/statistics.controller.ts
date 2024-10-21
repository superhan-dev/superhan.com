import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ProductStatisticsDto } from '../dto/product/response/product-statistics.response.dto';
import { ProductSwaggerData } from '../data/product.swagger.data';
import { PackageSwaggerData } from '../data/package.swagger.data';
import { PageClickResponseDto } from '../dto/statistics/response/page-click.response.dto';
import { CreateClickLogRequestDto } from '../dto/statistics/request/create-click-log.request.dto';
import { StatisticsWithRangeResponseDto } from '../dto/statistics/response/statistics-with-range-response.dto';
import { StatisticsFacadeFactory } from '@/ai-life/application/statistics/statistics.facade.factory';
import { CreateClickLogInfoDto } from '@/ai-life/application/dto/create-click-log.info.dto';
import { StatisticsEnum } from '@/common/enum/statistics.enum';
import { StatisticsSortEnum } from '@/common/enum/statistics-sort.enum';

@Controller('api/statistics')
@ApiTags('통계 조회 API')
export class StatisticsController {
  constructor(private readonly facadeFactory: StatisticsFacadeFactory) {}

  @Get('/page')
  @ApiOperation({ summary: '페이지 진입 시 페이지 클릭 통계 조회' })
  async countPageClick(
    @Query('type') type: string
  ): Promise<PageClickResponseDto> {
    return new PageClickResponseDto(
      await this.facadeFactory.getFacade(type).countPageClick()
    );
  }

  @Post('/click-log')
  @ApiOperation({ summary: '사용자가 클릭한 API 정보 로그 생성' })
  async createClickLog(
    @Req() req: Request,
    @Body() body: CreateClickLogRequestDto
  ): Promise<boolean> {
    const request: CreateClickLogInfoDto = new CreateClickLogInfoDto({
      type: body.type,
      ip: req.ip || '',
      device: req.headers['user-agent'] || '',
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      id: body.id,
      mediaId: body.mediaId,
    });

    return await this.facadeFactory
      .getFacade(body.pageType)
      .createClickLog(request);
  }

  @Get('/range/product/page')
  @ApiOperation({ summary: '선택한 날짜 범위의 제품 페이지 클릭 통계 조회' })
  @ApiQuery({ name: 'start', type: Date })
  @ApiQuery({ name: 'end', type: Date })
  async searchProductPageStatistics(
    @Query('start') start: Date,
    @Query('end') end: Date
  ): Promise<PageClickResponseDto> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return new PageClickResponseDto(
      await this.facadeFactory
        .getFacade(StatisticsEnum.PRODUCT)
        .countPageClickWithTimeRange(startDate, endDate)
    );
  }

  @Get('/range/product/media-click')
  @ApiOperation({ summary: '선택한 날짜 범위의 제품 미디어 클릭 통계 조회' })
  @ApiQuery({ name: 'start', type: Date })
  @ApiQuery({ name: 'end', type: Date })
  async searchProductMediaStatistics(
    @Query('start') start: Date,
    @Query('end') end: Date
  ): Promise<PageClickResponseDto> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return new PageClickResponseDto(
      await this.facadeFactory
        .getFacade(StatisticsEnum.PRODUCT)
        .countMediaClickWithTimeRange(startDate, endDate)
    );
  }

  @Get('/range/package/page')
  @ApiOperation({ summary: '선택한 날짜 범위의 패키지 페이지 클릭 통계 조회' })
  @ApiQuery({ name: 'start', type: Date })
  @ApiQuery({ name: 'end', type: Date })
  async searchPackagePageStatistics(
    @Query('start') start: Date,
    @Query('end') end: Date
  ): Promise<PageClickResponseDto> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return new PageClickResponseDto(
      await this.facadeFactory
        .getFacade(StatisticsEnum.PACKAGE)
        .countPageClickWithTimeRange(startDate, endDate)
    );
  }

  @Get('/range/package/media-click')
  @ApiOperation({ summary: '선택한 날짜 범위의 패키지 미디어 클릭 통계 조회' })
  @ApiQuery({ name: 'start', type: Date })
  @ApiQuery({ name: 'end', type: Date })
  async searchPackageMediaStatistics(
    @Query('start') start: Date,
    @Query('end') end: Date
  ): Promise<PageClickResponseDto> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return new PageClickResponseDto(
      await this.facadeFactory
        .getFacade(StatisticsEnum.PACKAGE)
        .countMediaClickWithTimeRange(startDate, endDate)
    );
  }

  @Get('/range/product')
  @ApiOperation({ summary: '선택한 날짜 범위의 제품 관련 통계 조회' })
  @ApiQuery({ name: 'start', type: Date })
  @ApiQuery({ name: 'end', type: Date })
  @ApiQuery({ name: 'type', enum: StatisticsSortEnum, required: false })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: ProductStatisticsDto,
    example: ProductSwaggerData.productStatistics,
  })
  async searchProductStatistics(
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('type') type?: StatisticsSortEnum
  ): Promise<StatisticsWithRangeResponseDto[]> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return await this.facadeFactory
      .getFacade(StatisticsEnum.PRODUCT)
      .statisticsWithTimeRange(
        startDate,
        endDate,
        type ? type : StatisticsSortEnum.ASC
      );
  }

  @Get('/range/package')
  @ApiOperation({ summary: '선택한 날짜 범위의 패키지 관련 통계 조회' })
  @ApiQuery({ name: 'start', type: Date })
  @ApiQuery({ name: 'end', type: Date })
  @ApiQuery({ name: 'type', enum: StatisticsSortEnum, required: false })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: ProductStatisticsDto,
    example: PackageSwaggerData.packageStatisticsResponse,
  })
  async searchPackageStatistics(
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('type') type?: StatisticsSortEnum
  ): Promise<StatisticsWithRangeResponseDto[]> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return await this.facadeFactory
      .getFacade(StatisticsEnum.PACKAGE)
      .statisticsWithTimeRange(
        startDate,
        endDate,
        type ? type : StatisticsSortEnum.ASC
      );
  }
}
