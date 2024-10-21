import { PackageStatistics } from '@/domain/samsung-ai-life/package/model/package-statistics';
import { PackageStatisticsTodayEntity } from '../entity/package-statistics-today.entity';

export class PackageStatisticsTodayMapper {
  static toDomain(entity: PackageStatisticsTodayEntity): PackageStatistics {
    return new PackageStatistics(
      entity.type,
      entity.clickCount,
      entity.packageId,
      entity.packageMediaId
    );
  }
}
