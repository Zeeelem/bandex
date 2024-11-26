import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Watchlist } from "./watchlist.model";

@Injectable()
export class WatchlistService {
    constructor(
        @InjectModel(Watchlist)
        private readonly watchlistRepository: typeof Watchlist
    ) {}

    async createAsset(user, dto) {
        const watchlist = {
            user: user.id,
            name: dto.name,
            assetId: dto.assetId,
        };
        await this.watchlistRepository.create(watchlist);
        return watchlist;
    }

    async deleteAsset(userId: number, assetId: string) {
        const asset = await this.watchlistRepository.findOne({
            where: { id: assetId, user: userId },
        });
        if (!asset) {
            return { message: "Не существует" };
        }
        await this.watchlistRepository.destroy({
            where: { id: assetId, user: userId },
        });
        return { message: `${asset.name} удален из списка` };
    }
}
