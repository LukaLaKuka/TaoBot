import { LovedUserEntity } from "../Entity/LovedUser";

export abstract class LovedUserRepository {
    abstract getLovedUsers(): LovedUserEntity[];
}

export class LovedUserRepositoryImplementation implements LovedUserRepository {
    constructor(
        readonly LovedUserDatasource: LovedUserRepository
    ) { }

    getLovedUsers(): LovedUserEntity[] {
        return this.LovedUserDatasource.getLovedUsers();
    }
}