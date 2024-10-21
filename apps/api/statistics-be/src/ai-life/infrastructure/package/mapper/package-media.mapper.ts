import { PackageVideo } from '@/domain/samsung-ai-life/package/model/package-video';
import { PackageMediaEntity } from '../entity/package-media.entity';

export class PackageMediaMapper {
  static toDomain(entity: PackageMediaEntity): PackageVideo {
    return new PackageVideo(
      entity.id,
      entity.packageId,
      entity.title,
      entity.description,
      entity.url
    );
  }
}
