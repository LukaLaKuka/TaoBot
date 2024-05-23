import { RepositoryError, RepositoryErrorNotFound } from "../../../../errors";
import { Repository } from "../../../../common";
import { GuildEntity } from "../Entity/GuildEntity";

export class GuildPrismaDatasource extends Repository<GuildEntity> {

    constructor() {
        super();
    }

    private buildCondition(id: number | string) {
        const condition = typeof id === 'string'
            ? { guild_id: id as string }
            : { id: id as number };
        return condition;
    }

    async getById(id: string | number): Promise<GuildEntity> {
        const condition = this.buildCondition(id);
        let guild = await this.prisma.guild.findUnique({
            where: condition
        });
        if (guild === null) {
            throw new RepositoryError("Guild not found")
        }
        return GuildEntity.guildFromPrisma(guild);
    }

    async getAll(): Promise<GuildEntity[]> {
        let guilds = await this.prisma.guild.findMany();
        guilds.map(g => GuildEntity.guildFromPrisma(g));
        return guilds;
    }

    async create(entity: GuildEntity): Promise<GuildEntity> {
        try {
            const guild = await this.prisma.guild.create({
                data: {
                    ...entity
                }
            });

            return GuildEntity.guildFromPrisma(guild);
        } catch (err: any) {
            if (err.message.includes('Unique constraint failed')) {
                throw new RepositoryError('Duplicated Unique Field');
            }
            throw new RepositoryError(err.message);
        }
    }

    async update(id: string | number, entity: GuildEntity): Promise<GuildEntity> {
        let condition = this.buildCondition(id);
        try {
            const guild = await this.prisma.guild.update({
                where: condition,
                data: { ...entity }
            });
            return GuildEntity.guildFromPrisma(guild);
        } catch (err: any) {
            if (err.message.includes('not found')) {
                throw new RepositoryErrorNotFound('Guild Not Found');
            }
            throw new RepositoryError(err.message);
        }
    }

    async delete(entity: GuildEntity): Promise<GuildEntity> {
        return (await this.deleteById(entity.guild_id));
    }

    async deleteById(id: string | number): Promise<GuildEntity> {
        try {
            const condition = this.buildCondition(id);
            const guild = await this.prisma.guild.delete({
                where: condition
            });
            return GuildEntity.guildFromPrisma(guild);
        } catch (err: any) {
            if (err.message.includes('not found')) {
                throw new RepositoryErrorNotFound('Guild Not Found');
            }
            throw new RepositoryError(err.message);
        }
    }

}