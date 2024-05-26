import { GuildEntity } from "app/Models/Guild";

export class LovedUserEntity {

    id?: number;
    userId: string;
    userName: string;
    guildId: string;


    constructor(belovedUser: {id?: number, userId: string, userName: string, guildId: string}) {
        this.id = belovedUser.id;
        this.userId = belovedUser.userId;
        this.userName = belovedUser.userName;
        this.guildId = belovedUser.guildId;
    }

    public static lovedUserFromPrisma(user: {id?: number, userId: string, userName: string, guildId: string}) {
        return new LovedUserEntity(user);
    }

    public customMessage(): string {
        return `Te amo ${this.userName}`;
    }
}