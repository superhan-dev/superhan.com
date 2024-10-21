import { Injectable } from '@nestjs/common';
import { PackageStatistics } from './model/package-statistics';

@Injectable()
export class PackageStatisticsHelper {
  addPackageClickCount(
    clickCountMap: Map<number, number>,
    stats: PackageStatistics[]
  ): Map<number, number> {
    stats?.forEach((stat) => {
      if (stat.packageId) {
        const currentCount: number = clickCountMap.get(stat.packageId) || 0;
        clickCountMap.set(stat.packageId, currentCount + stat.clickCount);
      }
    });

    return clickCountMap;
  }

  addVideoClickCount(
    clickCountMap: Map<number, number>,
    stats: PackageStatistics[]
  ): Map<number, number> {
    stats?.forEach((stat) => {
      if (stat.packageId) {
        const currentCount: number = clickCountMap.get(stat.packageId) || 0;
        clickCountMap.set(stat.packageId, currentCount + stat.clickCount);
      }
    });

    return clickCountMap;
  }
  mapByPackageId(
    map: Map<number, PackageStatistics[]>,
    stats: PackageStatistics[]
  ): Map<number, PackageStatistics[]> {
    stats?.forEach((stat) => {
      const packageStatistics: PackageStatistics[] | undefined = map.get(
        stat.packageId
      );

      if (packageStatistics) {
        const subMedia = packageStatistics.find(
          (media) => media.packageMediaId === stat.packageMediaId
        );

        if (subMedia) {
          subMedia.clickCount += stat.clickCount;
        } else {
          packageStatistics.push({ ...stat });
        }
      } else {
        map.set(stat.packageId, [{ ...stat }]);
      }
    });

    return map;
  }
}
