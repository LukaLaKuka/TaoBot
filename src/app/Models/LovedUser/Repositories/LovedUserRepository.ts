import { UserEntity } from "../../User";
import { LovedUserEntity } from "..";
import { GuildEntity } from "../../Guild";

export abstract class ILovedUserRepository {
    abstract get(condition?: { where: object }): Promise<LovedUserEntity[] | null>
    abstract getById(guildId: string, userId: string): Promise<LovedUserEntity | null>
    abstract create(entity: LovedUserEntity): Promise<LovedUserEntity | null>
    abstract update(guildId: string, userId: string, entity: LovedUserEntity): Promise<LovedUserEntity | null>
    abstract delete(condition?: { where: object }): Promise<void>
    abstract deleteById(guildId: string, userId: string): Promise<LovedUserEntity | null>
    abstract getUser(user: LovedUserEntity): Promise<UserEntity | null>
    abstract getGuild(user: LovedUserEntity): Promise<GuildEntity | null>
}

export class LovedUserRepository extends ILovedUserRepository {

    constructor(
        private readonly lovedUserService: ILovedUserRepository
    ) {
        super()
    }

    async get(condition?: { where: object }): Promise<LovedUserEntity[] | null> {
        return (await this.lovedUserService.get(condition));
    }

    async getById(guildId: string, userId: string): Promise<LovedUserEntity | null> {
        return (await this.lovedUserService.getById(guildId, userId));
    }

    async create(entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        return (await this.lovedUserService.create(entity));
    }

    async update(guildId: string, userId: string, entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        return (await this.lovedUserService.update(guildId, userId, entity));
    }

    async delete(condition?: { where: object }): Promise<void> {
        await this.lovedUserService.delete(condition);
    }

    async deleteById(guildId: string, userId: string): Promise<LovedUserEntity | null> {
        return (await this.lovedUserService.deleteById(guildId, userId));
    }

    async getUser(user: LovedUserEntity): Promise<UserEntity | null> {
        return (await this.lovedUserService.getUser(user));
    }

    async getGuild(user: LovedUserEntity): Promise<GuildEntity | null> {
        return (await this.lovedUserService.getGuild(user));
    }
}

