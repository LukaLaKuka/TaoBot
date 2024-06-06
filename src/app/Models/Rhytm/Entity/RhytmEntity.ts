export class RhytmEntity {
    id: number;
    name: string;
    pattern: RegExp;
    guildId: string;

    constructor(rhytm: { id: number, name: string, pattern: string, guildId: string }) {
        this.id = rhytm.id;
        this.name = rhytm.name;
        this.pattern = new RegExp(rhytm.pattern);
        this.guildId = rhytm.guildId;
    }

    public static rhytmFromPrisma(rhytm: { id: number, name: string, pattern: string, guildId: string }): RhytmEntity {
        return new RhytmEntity(rhytm);
    }
}