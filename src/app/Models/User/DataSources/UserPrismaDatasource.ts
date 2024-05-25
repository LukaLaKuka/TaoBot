import { PrismaRepository } from "../../../../common";
import { UserEntity } from "../Entity/UserEntity";

export class UserPrismaDatasource extends PrismaRepository<UserEntity> {

    async getById(id: string): Promise<UserEntity | null> {
        let user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });
        if (user === null) {
            return null;
        }
        return null;
    }

    async getAll(): Promise<UserEntity[]> {
        let users = await this.prisma.user.findMany();
        users.map(u => UserEntity.userFromPrisma(u));
        return users;
    }

    async create(entity: UserEntity): Promise<UserEntity | null> {
        try {
            const user = await this.prisma.user.create({
                data: {
                    ...entity
                }
            });
            return UserEntity.userFromPrisma(user);
        } catch (err: any) {
            return null;
        }
    }

    async update(id: string, entity: UserEntity): Promise<UserEntity | null> {
        try {
            const user = await this.prisma.user.update({
                where: {
                    id
                },
                data: { ...entity }
            });
            return UserEntity.userFromPrisma(user);
        } catch (err: any) {
            return null;
        }
    }

    async delete(entity: UserEntity): Promise<UserEntity | null> {
        return (await this.deleteById(entity.id));
    }

    async deleteById(id: string): Promise<UserEntity | null> {
        try {
            const user = await this.prisma.user.delete({
                where: {
                    id
                }
            });
            return UserEntity.userFromPrisma(user);
        } catch (err: any) {
            return null;
        }
    }
}