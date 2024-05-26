export class UserEntity {

    id: string;

    constructor(user: {id: string}) {
        this.id = user.id;
    }

    public static userFromPrisma(user: { id: string }): UserEntity {
        return new UserEntity(user);
    }
}