import { Entity } from "../../../../common";

export class UserEntity extends Entity {
    
    id: string;

    constructor(user: {id: string}) {
        super()
        this.id = user.id;
    }

    public static userFromPrisma(user: {id: string}): UserEntity {
        return new UserEntity(user);
    }
}