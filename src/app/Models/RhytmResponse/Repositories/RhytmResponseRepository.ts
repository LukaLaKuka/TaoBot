import { RhytmResponseEntity } from "..";

export abstract class IRhytmResponseRepository {
    abstract get(condition?: { where: object }): Promise<RhytmResponseEntity[] | null>;
    abstract getById(id: number): Promise<RhytmResponseEntity | null>;
    abstract create(entity: RhytmResponseEntity): Promise<RhytmResponseEntity | null>;
    abstract update(id: number, entity: RhytmResponseEntity): Promise<RhytmResponseEntity | null>;
    abstract deleteById(id: number): Promise<RhytmResponseEntity | null>;
    abstract delete(condition?: { where: object }): Promise<void>;
}

export class RhytmResponseRepository extends IRhytmResponseRepository {

    constructor(private readonly rhytmresponseService: IRhytmResponseRepository) {
        super()
    }

    async get(condition?: { where: object; } | undefined): Promise<RhytmResponseEntity[] | null> {
        return (await this.rhytmresponseService.get(condition));
    }

    async getById(id: number): Promise<RhytmResponseEntity | null> {
        return (await this.rhytmresponseService.getById(id));
    }

    async create(entity: RhytmResponseEntity): Promise<RhytmResponseEntity | null> {
        return (await this.rhytmresponseService.create(entity));
    }

    async update(id: number, entity: RhytmResponseEntity): Promise<RhytmResponseEntity | null> {
        return (await this.rhytmresponseService.update(id, entity));
    }

    async deleteById(id: number): Promise<RhytmResponseEntity | null> {
        return (await this.rhytmresponseService.deleteById(id));
    }

    async delete(condition?: { where: object; } | undefined): Promise<void> {
        await this.rhytmresponseService.delete(condition);
    }
}