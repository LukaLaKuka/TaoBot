import { Entity } from "../../../../common";

export class GuildEntity extends Entity {

    id?: number;
    guild_id: string;

    constructor(guild: {id?: number, guild_id: string}) {
        super()
        this.id = guild.id;
        this.guild_id = guild.guild_id;
    }

    public static guildFromPrisma(guild: { id: number, guild_id: string }): GuildEntity {
        return new GuildEntity(guild);
    }
}