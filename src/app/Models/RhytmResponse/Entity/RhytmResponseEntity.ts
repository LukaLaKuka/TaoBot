export class RhytmResponseEntity {
    id: number;
    response: string;
    rhytmId: number;

    constructor(rhytmresponse: { id: number, response: string, rhytmId: number }) {
        this.id = rhytmresponse.id;
        this.response = rhytmresponse.response;
        this.rhytmId = rhytmresponse.rhytmId;
    }

    public static rhytmresponseFromPrisma(rhytmresponse: { id: number, response: string, rhytmId: number }): RhytmResponseEntity {
        return new RhytmResponseEntity(rhytmresponse);
    }
}