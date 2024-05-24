import { Repository } from "../../../../common";
import { GuildEntity } from "..";

export class GuildRepository extends Repository<GuildEntity> {

    constructor(
        readonly GuildDatasource: Repository<GuildEntity>
    ) {
        super()
    }
    
    async getAll(): Promise<GuildEntity[]> {
        return (await this.GuildDatasource.getAll());
    }

    async getById(id: string | number): Promise<GuildEntity | null> {
        return (await this.GuildDatasource.getById(id));
    }
    
    async create(entity: GuildEntity): Promise<GuildEntity | null> {
        return (await this.GuildDatasource.create(entity));
    }

    async update(id: number | string, entity: GuildEntity): Promise<GuildEntity | null> {
        return (await this.GuildDatasource.update(id, entity));
    }

    async delete(entity: GuildEntity): Promise<GuildEntity | null> {
        return (await this.GuildDatasource.delete(entity))
    }

    async deleteById(id: string | number): Promise<GuildEntity | null> {
        return (await this.GuildDatasource.deleteById(id));
    }
}

