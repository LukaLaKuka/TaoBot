import { Repository } from "../../../../common";
import { LovedUserEntity } from "..";

export class LovedUserRepository extends Repository<LovedUserEntity> {

    constructor(
        readonly LovedUserDataSource: Repository<LovedUserEntity>
    ) {
        super()
    }

    async getAll(): Promise<LovedUserEntity[]> {
        return (await this.LovedUserDataSource.getAll());
    }

    async getById(id: string | number): Promise<LovedUserEntity | null> {
        return (await this.LovedUserDataSource.getById(id));
    }

    async create(entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        return (await this.LovedUserDataSource.create(entity));
    }

    async update(id: number | string, entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        return (await this.LovedUserDataSource.update(id, entity));
    }

    async delete(entity: LovedUserEntity): Promise<LovedUserEntity | null> {
        return (await this.LovedUserDataSource.delete(entity))
    }

    async deleteById(id: string | number): Promise<LovedUserEntity | null> {
        return (await this.LovedUserDataSource.deleteById(id));
    }
}

