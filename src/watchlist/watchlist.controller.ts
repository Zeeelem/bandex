import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { WatchlistDto } from "./dto";
import { JwtAuthGuard } from "src/guards/jwt-guard";

@Controller("watchlist")
export class WatchlistController {
  constructor(private watchListService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  createAsset(@Body() assetDto: WatchlistDto, @Req() req) {
    const user = req.user;
    return this.watchListService.createAsset(user, assetDto);
  }

  @Get("get-all")
  getAllAssets() {
    return;
  }

  @Patch("update")
  updateAsset() {
    return;
  }

  @Delete()
  deleteAsset(@Query("id") id: string) {}
}
