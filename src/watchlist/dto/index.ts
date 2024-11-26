import { IsString } from "class-validator";

export class WatchlistDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly assetId: string;
}
