import { PackageStatistics } from '@/domain/samsung-ai-life/package/model/package-statistics';
import { PackageStatisticsPastEntity } from '../entity/package-statistics-past.entity';

export class PackageStatisticsPastMapper {
  static toDomain(entity: PackageStatisticsPastEntity): PackageStatistics {
    return new PackageStatistics(
      entity.type,
      entity.clickCount,
      entity.packageId,
      entity.packageMediaId
    );
  }
}
