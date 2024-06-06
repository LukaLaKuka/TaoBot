import { RhytmResponseEntity } from "app/Models/RhytmResponse";
import { RhytmEntity } from "..";

export abstract class IRhytmRepository {
    abstract get(condition?: { where: object }): Promise<RhytmEntity[] | RhytmEntity | null>;
    abstract getById(id: number): Promise<RhytmEntity | null>;
    abstract create(entity: RhytmEntity): Promise<RhytmEntity | null>;
    abstract update(id: number, entity: RhytmEntity): Promise<RhytmEntity | null>;
    abstract deleteById(id: number): Promise<RhytmEntity | null>;
    abstract delete(condition?: { where: object }): Promise<void>;
    abstract getResponses(id: number): Promise<RhytmResponseEntity[] | null>
}

export class RhytmRepository extends IRhytmRepository {

    constructor(private readonly rhytmService: IRhytmRepository) {
        super()
    }

    async get(condition?: { where: object; } | undefined): Promise<RhytmEntity[] | RhytmEntity | null> {
        return (await this.rhytmService.get(condition));
    }

    async getById(id: number): Promise<RhytmEntity | null> {
        return (await this.rhytmService.getById(id));
    }

    async create(entity: RhytmEntity): Promise<RhytmEntity | null> {
        return (await this.rhytmService.create(entity));
    }

    async update(id: number, entity: RhytmEntity): Promise<RhytmEntity | null> {
        return (await this.rhytmService.update(id, entity));
    }

    async deleteById(id: number): Promise<RhytmEntity | null> {
        return (await this.rhytmService.deleteById(id));
    }

    async delete(condition?: { where: object; } | undefined): Promise<void> {
        await this.rhytmService.delete(condition);
    }

    async getResponses(id: number): Promise<RhytmResponseEntity[] | null> {
        return (await this.rhytmService.getResponses(id));
    }
}