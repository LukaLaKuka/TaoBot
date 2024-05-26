export class GuildEntity {

    id: string;

    constructor(guild: {id: string}) {
        this.id = guild.id;
    }

    public static guildFromPrisma(guild: { id: string }): GuildEntity {
        return new GuildEntity(guild);
    }
}