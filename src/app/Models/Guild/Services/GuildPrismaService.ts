import { PrismaClient } from "@prisma/client";
import { GuildEntity, IGuildRepository } from "..";

export class GuildPrismaService extends IGuildRepository {

    private readonly prisma = new PrismaClient()['guild'];

    async getById(id: string): Promise<GuildEntity | null> {
        let guild = await this.prisma.findUnique({
            where: {
                id
            }
        });
        if (guild === null) {
            return null;
        }
        return GuildEntity.guildFromPrisma(guild);
    }

    async get(condition?: {where: object}): Promise<GuildEntity[]> {
        let guilds = await this.prisma.findMany(condition);
        guilds.map(g => GuildEntity.guildFromPrisma(g));
        return guilds;
    }

    async create(entity: GuildEntity): Promise<GuildEntity | null> {
        try {
            const guild = await this.prisma.create({
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
            const guild = await this.prisma.update({
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

    async delete(condition?: {where: object}): Promise<void> {
        await this.prisma.deleteMany(condition);
    }

    async deleteById(id: string): Promise<GuildEntity | null> {
        try {
            const guild = await this.prisma.delete({
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