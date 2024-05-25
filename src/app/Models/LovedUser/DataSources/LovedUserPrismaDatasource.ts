import { UserEntity } from "../../User";
import { GuildEntity } from "../../Guild";
import { LovedUserEntity } from "../Entity/LovedUser";
import { PrismaRepository } from "../../../../common";

export class LovedUserPrismaDatasource extends PrismaRepository<LovedUserEntity> {

    async getById(id: number): Promise<LovedUserEntity | null> {
        const user = await this.prisma.belovedUser.findUnique({
            where: {
                id,
            }
        });

        if (!user) return null
        return null;
    }

    async getAll(): Promise<LovedUserEntity[]> {
        throw new Error("Method not implemented.");
    }

    async create(entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        const user = await this.prisma.belovedUser.create({
            data: {
                userName: entity.userName,
                guildId: entity.guildId,
                userId: entity.userId,
            }
        });
        if (!user) {
            return null;
        }
        return LovedUserEntity.lovedUserFromPrisma(user);
    }

    async update(id: number, entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        const user = await this.prisma.belovedUser.update({
            where: {
                id
            },
            data: {
                id,
                ...entity
            }
        });
        if (!user) {
            return null;
        }
        return LovedUserEntity.lovedUserFromPrisma(user);
    }

    async delete(entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        if (entity.id !== undefined) {
            return await this.deleteById(entity.id);
        }
        return null;
    }

    async deleteById(id: number): Promise<LovedUserEntity | null> {
        const user = await this.prisma.belovedUser.delete({
            where:
            {
                id
            },
        });
        if (!user) {
            return null;
        }
        return LovedUserEntity.lovedUserFromPrisma(user);
    }

    async getUser(belovedUser: LovedUserEntity) {
        if (belovedUser.id === undefined) {
            return null;
        }
        const user = await this.prisma.belovedUser.findUnique({
            where: {
                id: belovedUser.id
            },
            include: {
                user: true
            }
        });

        if (!user || !user.user) {
            return null;
        }

        return UserEntity.userFromPrisma(user.user);
    }

    async getGuild(belovedUser: LovedUserEntity) {
        if (belovedUser.id === undefined) {
            return null;
        }
        const user = await this.prisma.belovedUser.findUnique({
            where: {
                id: belovedUser.id
            },
            include: {
                guild: true
            }
        });

        if (!user || !user.guild) {
            return null;
        }

        return GuildEntity.guildFromPrisma(user.guild);
    }

    async getByUserAndGuild(guildId: string, userId: string) {
        const user = await this.prisma.belovedUser.findFirst({
            where: {
                guildId,
                userId,
            }
        });

        if (!user) {
            return null;
        }

        return LovedUserEntity.lovedUserFromPrisma(user);
    }
}