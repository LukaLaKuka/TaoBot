import { Repository } from "../../../../common";
import { UserEntity } from "..";

export class UserRepository extends Repository<UserEntity> {

    constructor(
        readonly UserDatasource: Repository<UserEntity>
    ) {
        super()
    }
    
    async getAll(): Promise<UserEntity[]> {
        return (await this.UserDatasource.getAll());
    }

    async getById(id: string | number): Promise<UserEntity | null> {
        return (await this.UserDatasource.getById(id));
    }
    
    async create(entity: UserEntity): Promise<UserEntity | null> {
        return (await this.UserDatasource.create(entity));
    }

    async update(id: number | string, entity: UserEntity): Promise<UserEntity | null> {
        return (await this.UserDatasource.update(id, entity));
    }

    async delete(entity: UserEntity): Promise<UserEntity | null> {
        return (await this.UserDatasource.delete(entity))
    }

    async deleteById(id: string | number): Promise<UserEntity | null> {
        return (await this.UserDatasource.deleteById(id));
    }
}