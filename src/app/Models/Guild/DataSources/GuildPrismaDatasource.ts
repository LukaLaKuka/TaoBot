import { RepositoryError, RepositoryErrorNotFound } from "../../../../errors";
import { PrismaRepository } from "../../../../common";
import { GuildEntity } from "../Entity/GuildEntity";

export class GuildPrismaDatasource extends PrismaRepository<GuildEntity> {

    async getById(id: string): Promise<GuildEntity | null> {
        let guild = await this.prisma.guild.findUnique({
            where: {
                id
            }
        });
        if (guild === null) {
            return null;
        }
        return GuildEntity.guildFromPrisma(guild);
    }

    async getAll(): Promise<GuildEntity[]> {
        let guilds = await this.prisma.guild.findMany();
        guilds.map(g => GuildEntity.guildFromPrisma(g));
        return guilds;
    }

    async create(entity: GuildEntity): Promise<GuildEntity | null> {
        try {
            const guild = await this.prisma.guild.create({
                data: {
                    ...entity
                }
            });
            return GuildEntity.guildFromPrisma(guild);
        } catch (err: any) {
            // if (err.message.includes('Unique constraint failed')) {
            //     return null;
            // }
            return null;
        }
    }

    async update(id: string, entity: GuildEntity): Promise<GuildEntity | null> {
        try {
            const guild = await this.prisma.guild.update({
                where: {
                    id
                },
                data: { ...entity }
            });
            return GuildEntity.guildFromPrisma(guild);
        } catch (err: any) {
            // if (err.message.includes('not found')) {
            //     throw new RepositoryErrorNotFound('Guild Not Found');
            // }
            return null;
        }
    }

    async delete(entity: GuildEntity): Promise<GuildEntity | null> {
        return (await this.deleteById(entity.id));
    }

    async deleteById(id: string): Promise<GuildEntity | null> {
        try {
            const guild = await this.prisma.guild.delete({
                where: {
                    id
                }
            });
            return GuildEntity.guildFromPrisma(guild);
        } catch (err: any) {
            // if (err.message.includes('not found')) {
            //     throw new RepositoryErrorNotFound('Guild Not Found');
            // }
            return null;
        }
    }

}