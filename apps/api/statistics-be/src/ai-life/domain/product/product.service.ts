import { Product } from './model/product';
import { Injectable } from '@nestjs/common';
import { ProductStatisticsHelper } from './product-statistics.helper';
import { CreateClickLogInfoDto } from '../../../application/samsung-ai-life/dto/create-click-log.info.dto';
import { ProductStatistics } from './model/product-statistics';
import { ProductVideo } from './model/product-video';
import { ProductRepository } from '@/infrastructure/samsung-ai-life/product/repository/product.repository';
import { ProductMediaRepository } from '@/infrastructure/samsung-ai-life/product/repository/product-media-repository.service';
import { ProductStatisticsPastRepository } from '@/infrastructure/samsung-ai-life/product/repository/product-statistics-past.repository';
import { ProductStatisticsTodayRepository } from '@/infrastructure/samsung-ai-life/product/repository/product-statistics-today.repository';
import { ProductLogRepository } from '@/infrastructure/samsung-ai-life/product/repository/product-log.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productMediaRepository: ProductMediaRepository,
    private readonly statisticsPastRepository: ProductStatisticsPastRepository,
    private readonly statisticsTodayRepository: ProductStatisticsTodayRepository,
    private readonly productLogRepository: ProductLogRepository,
    private readonly statisticsHelper: ProductStatisticsHelper
  ) {}

  async getProductList(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductStatistics(
    productIdList: number[]
  ): Promise<Map<number, number>> {
    const pastStatistics =
      await this.statisticsPastRepository.findProductStatistics(productIdList);

    const todayStatistics =
      await this.statisticsTodayRepository.findProductStatistics(productIdList);

    const clickCountMap = new Map<number, number>();
    this.statisticsHelper.addProductClickCount(clickCountMap, pastStatistics);
    this.statisticsHelper.addProductClickCount(clickCountMap, todayStatistics);

    return clickCountMap;
  }

  async getCardList() {
    return await this.productMediaRepository.findAllCards();
  }

  async getCardStatistics(
    thumbnailVideoIds: number[]
  ): Promise<Map<number, number>> {
    const pastStatistics =
      await this.statisticsPastRepository.findCardStatistics(thumbnailVideoIds);

    const todayStatistics =
      await this.statisticsTodayRepository.findCardStatistics(
        thumbnailVideoIds
      );

    const clickCountMap = new Map<number, number>();
    this.statisticsHelper.addProductClickCount(clickCountMap, pastStatistics);
    this.statisticsHelper.addProductClickCount(clickCountMap, todayStatistics);

    return clickCountMap;
  }

  async getVideoList(productId: number) {
    return this.productMediaRepository.findProductVideos(productId);
  }

  async getVideoStatistics(videoIds: number[]): Promise<Map<number, number>> {
    const pastStatistics =
      await this.statisticsPastRepository.findVideoStatistics(videoIds);

    const todayStatistics =
      await this.statisticsTodayRepository.findVideoStatistics(videoIds);

    const clickCountMap = new Map<number, number>();
    this.statisticsHelper.addVideoClickCount(clickCountMap, pastStatistics);
    this.statisticsHelper.addVideoClickCount(clickCountMap, todayStatistics);

    return clickCountMap;
  }

  async countPageClick() {
    const pastCount = await this.statisticsPastRepository.countPageClick();
    const todayCount = await this.statisticsTodayRepository.countPageClick();
    return pastCount + todayCount;
  }

  async createClickLog(request: CreateClickLogInfoDto) {
    return await this.productLogRepository.createClickLog(request);
  }

  async countClicksAfterGivenDate(date: Date): Promise<ProductStatistics[]> {
    return await this.productLogRepository.countClicksAfterGivenDate(date);
  }

  async updateStatistics(clickCounts: ProductStatistics[]): Promise<boolean> {
    return await this.statisticsTodayRepository.updateClickCounts(clickCounts);
  }

  async countMediaClickWithTimeRange(start: Date, end: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastStatistics =
      start < today
        ? await this.statisticsPastRepository.countMediaClickWithTimeRange(
            start,
            end
          )
        : 0;

    const todayStatistics =
      end > today
        ? await this.statisticsTodayRepository.countMediaClickWithTimeRange(
            start,
            end
          )
        : 0;

    return pastStatistics + todayStatistics;
  }

  async countPageClickWithTimeRange(start: Date, end: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastStatistics =
      start < today
        ? await this.statisticsPastRepository.countPageClickWithTimeRange(
            start,
            end
          )
        : 0;

    const todayStatistics =
      end > today
        ? await this.statisticsTodayRepository.countPageClickWithTimeRange(
            start,
            end
          )
        : 0;

    return pastStatistics + todayStatistics;
  }

  async findProductNameList(): Promise<
    Map<number, { name: string; description: string }>
  > {
    const packages = await this.productRepository.findAll();

    const map = new Map<number, { name: string; description: string }>();
    packages.forEach((p) => {
      map.set(p.id, { name: p.name, description: p.description || '' });
    });

    return map;
  }

  async findVideoNameList(): Promise<
    Map<number, { title: string; description: string }>
  > {
    const videos: ProductVideo[] =
      await this.productMediaRepository.findAllVideos();

    const map = new Map<number, { title: string; description: string }>();
    videos.forEach((video) => {
      map.set(video.id, { title: video.title, description: video.description });
    });

    return map;
  }

  async productStatisticsWithRange(
    start: Date,
    end: Date
  ): Promise<Map<number, number>> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastStatistics =
      start < today
        ? await this.statisticsPastRepository.findProductStatisticsWithTimeRange(
            start,
            end
          )
        : [];

    const todayStatistics =
      end > today
        ? await this.statisticsTodayRepository.findProductStatisticsWithTimeRange(
            start,
            end
          )
        : [];

    const map = new Map<number, number>();
    this.statisticsHelper.addProductClickCount(map, pastStatistics);
    this.statisticsHelper.addProductClickCount(map, todayStatistics);

    return map;
  }

  async findVideoStatisticsWithRange(start: Date, end: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastStatistics =
      start < today
        ? await this.statisticsPastRepository.findVideoStatisticsWithTimeRange(
            start,
            end
          )
        : [];

    const todayStatistics =
      end > today
        ? await this.statisticsTodayRepository.findVideoStatisticsWithTimeRange(
            start,
            end
          )
        : [];

    const map = new Map<number, ProductStatistics[]>();
    this.statisticsHelper.mapByProductId(map, pastStatistics);
    this.statisticsHelper.mapByProductId(map, todayStatistics);
    return map;
  }

  async findAllTodayStatistics(): Promise<ProductStatistics[]> {
    return await this.statisticsTodayRepository.findAll();
  }

  async createPastStatistics(
    productStatistics: ProductStatistics[],
    date: Date
  ) {
    return await this.statisticsPastRepository.createStatistics(
      productStatistics,
      date
    );
  }

  async resetStatisticCount(): Promise<boolean> {
    return await this.statisticsTodayRepository.resetClickCount();
  }
}
