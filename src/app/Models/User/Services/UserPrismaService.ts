import { PrismaClient } from "@prisma/client";
import { UserEntity, IUserRepository } from "..";

export class UserPrismaService extends IUserRepository {

    private readonly prisma = new PrismaClient()['user'];

    async getById(id: string): Promise<UserEntity | null> {
        let guild = await this.prisma.findUnique({
            where: {
                id
            }
        });
        if (guild === null) {
            return null;
        }
        return UserEntity.userFromPrisma(guild);
    }

    async get(condition?: {where: object}): Promise<UserEntity[]> {
        let guilds = await this.prisma.findMany(condition);
        guilds.map(g => UserEntity.userFromPrisma(g));
        return guilds;
    }

    async create(entity: UserEntity): Promise<UserEntity | null> {
        try {
            const guild = await this.prisma.create({
                data: {
                    ...entity
                }
            });
            return UserEntity.userFromPrisma(guild);
        } catch (err: any) {
            // if (err.message.includes('Unique constraint failed')) {
            //     return null;
            // }
            return null;
        }
    }

    async update(id: string, entity: UserEntity): Promise<UserEntity | null> {
        try {
            const guild = await this.prisma.update({
                where: {
                    id
                },
                data: { ...entity }
            });
            return UserEntity.userFromPrisma(guild);
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

    async deleteById(id: string): Promise<UserEntity | null> {
        try {
            const guild = await this.prisma.delete({
                where: {
                    id
                }
            });
            return UserEntity.userFromPrisma(guild);
        } catch (err: any) {
            // if (err.message.includes('not found')) {
            //     throw new RepositoryErrorNotFound('Guild Not Found');
            // }
            return null;
        }
    }

}