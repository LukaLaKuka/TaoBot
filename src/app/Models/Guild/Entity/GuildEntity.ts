import { Entity } from "../../../../common";

export class GuildEntity extends Entity {

    id: string;

    constructor(guild: {id: string}) {
        super()
        this.id = guild.id;
    }

    public static guildFromPrisma(guild: { id: string }): GuildEntity {
        return new GuildEntity(guild);
    }
}