import { Package } from '@/domain/samsung-ai-life/package/model/package';
import { PackageEntity } from '../entity/package.entity';

export class PackageMapper {
  static toDomain(entity: PackageEntity): Package {
    return new Package(
      entity.id,
      entity.name,
      entity.imageUrl || '',
      entity.description
    );
  }
}
