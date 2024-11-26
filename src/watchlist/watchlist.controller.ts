import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
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

    @UseGuards(JwtAuthGuard)
    @Delete("delete")
    deleteAsset(@Query("id") assetId: string, @Req() req) {
        const { id } = req.user;
        return this.watchListService.deleteAsset(id, assetId);
    }
}
