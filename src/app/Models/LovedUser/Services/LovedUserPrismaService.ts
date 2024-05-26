import { UserEntity } from "../../User";
import { GuildEntity } from "../../Guild";
import { LovedUserEntity } from "../Entity/LovedUser";
import { ILovedUserRepository } from "../Repositories/LovedUserRepository";
import { PrismaClient } from "@prisma/client";

export class LovedUserPrismaService extends ILovedUserRepository {

    private readonly prisma = new PrismaClient()['belovedUser'];

    async getById(guildId: string, userId: string): Promise<LovedUserEntity | null> {
        const user = await this.prisma.findFirst({
            where: {
                guildId,
                userId,
            }
        });

        if (!user) return null
        return LovedUserEntity.lovedUserFromPrisma(user);
    }

    async get(condition?: { where: object }): Promise<LovedUserEntity[] | null> {
        const users = await this.prisma.findMany(condition);
        const belovedUsers = users.map(u => LovedUserEntity.lovedUserFromPrisma(u));
        return belovedUsers;
    }

    async create(entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        const user = await this.prisma.create({
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

    async update(guildId: string, userId: string, entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        let user = await this.getById(guildId, userId);
        if (!user) {
            return null;
        }
        const belovedUser = await this.prisma.update({
            where: {
                id: user.id
            },
            data: {
                id: user.id,
                ...entity
            }
        });
        return LovedUserEntity.lovedUserFromPrisma(belovedUser);
    }

    async delete(condition?: { where: {} }): Promise<void> {
        await this.prisma.deleteMany(condition);
    }

    async deleteById(guildId: string, userId: string): Promise<LovedUserEntity | null> {
        const user = await this.getById(guildId, userId);
        if (!user) {
            return null;
        }
        const belovedUser = await this.prisma.delete({
            where:
            {
                id: user.id,
            },
        });
        if (!belovedUser) {
            return null;
        }
        return LovedUserEntity.lovedUserFromPrisma(belovedUser);
    }

    async getUser(belovedUser: LovedUserEntity): Promise<UserEntity | null> {
        if (belovedUser.id === undefined) {
            let belovedUserDB = await this.getById(belovedUser.guildId, belovedUser.userId);
            if (!belovedUserDB) {
                return null;
            }
            belovedUser = belovedUserDB;
        }

        const user = await this.prisma.findUnique({
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
            let belovedUserDB = await this.getById(belovedUser.guildId, belovedUser.userId);
            if (!belovedUserDB) {
                return null;
            }
            belovedUser = belovedUserDB;
        }

        const user = await this.prisma.findUnique({
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
}