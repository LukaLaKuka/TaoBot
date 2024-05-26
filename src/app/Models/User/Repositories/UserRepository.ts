import { UserEntity } from "..";

export abstract class IUserRepository {
    abstract get(condition?: { where: object }): Promise<UserEntity[] | null>;
    abstract getById(id: string): Promise<UserEntity | null>;
    abstract create(entity: UserEntity): Promise<UserEntity | null>;
    abstract update(id: string, entity: UserEntity): Promise<UserEntity | null>;
    abstract deleteById(id: string): Promise<UserEntity | null>;
    abstract delete(condition?: { where: object }): Promise<void>;
}

export class UserRepository extends IUserRepository {

    constructor(private readonly userService: IUserRepository) {
        super()
    }

    async get(condition?: { where: object; } | undefined): Promise<UserEntity[] | null> {
        return (await this.userService.get(condition));
    }

    async getById(id: string): Promise<UserEntity | null> {
        return (await this.userService.getById(id));
    }

    async create(entity: UserEntity): Promise<UserEntity | null> {
        return (await this.userService.create(entity));
    }

    async update(id: string, entity: UserEntity): Promise<UserEntity | null> {
        return (await this.userService.update(id, entity));
    }

    async deleteById(id: string): Promise<UserEntity | null> {
        return (await this.userService.deleteById(id));
    }

    async delete(condition?: { where: object; } | undefined): Promise<void> {
        await this.userService.delete(condition);
    }
}