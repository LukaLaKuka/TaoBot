import { GuildEntity } from "..";

export abstract class IGuildRepository {
    abstract get(condition?: { where: object }): Promise<GuildEntity[] | null>;
    abstract getById(id: string): Promise<GuildEntity | null>;
    abstract create(entity: GuildEntity): Promise<GuildEntity | null>;
    abstract update(id: string, entity: GuildEntity): Promise<GuildEntity | null>;
    abstract deleteById(id: string): Promise<GuildEntity | null>;
    abstract delete(condition?: { where: object }): Promise<void>;
}

export class GuildRepository extends IGuildRepository {

    constructor(private readonly guildService: IGuildRepository) {
        super();
    }

    async get(condition?: { where: object; } | undefined): Promise<GuildEntity[] | null> {
        return (await this.guildService.get(condition));
    }

    async getById(id: string): Promise<GuildEntity | null> {
        return (await this.guildService.getById(id));
    }

    async create(entity: GuildEntity): Promise<GuildEntity | null> {
        return (await this.guildService.create(entity));
    }

    async update(id: string, entity: GuildEntity): Promise<GuildEntity | null> {
        return (await this.guildService.update(id, entity));
    }

    async deleteById(id: string): Promise<GuildEntity | null> {
        return (await this.guildService.deleteById(id));
    }

    async delete(condition?: { where: object; } | undefined): Promise<void> {
        await this.guildService.delete(condition);
    }
}