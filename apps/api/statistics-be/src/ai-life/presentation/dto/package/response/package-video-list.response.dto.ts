import { PackageVideo } from '@/ai-life/domain/package/model/package-video';

export class PackageVideoListResponseDto {
  constructor(public videoList: PackageVideoDto[]) {}

  static fromDomain(domains: PackageVideo[]): PackageVideoListResponseDto {
    return new PackageVideoListResponseDto(
      domains.map((domain) => PackageVideoDto.fromDomain(domain))
    );
  }
}

export class PackageVideoDto {
  constructor(
    public videoId: number,
    public packageId: number,
    public title: string,
    public url: string,
    public count: number,
    public percent: number
  ) {}

  static fromDomain(domain: PackageVideo): PackageVideoDto {
    return new PackageVideoDto(
      domain.id,
      domain.packageId,
      domain.title,
      domain.url,
      domain.count || 0,
      domain.percent || 0
    );
  }
}
