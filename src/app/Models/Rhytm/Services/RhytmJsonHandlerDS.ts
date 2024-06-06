import { JsonHandler } from "@tomhuel/jsonhandler";
import { RhytmEntity } from "../Entity/RhytmEntity";
import { IRhytmRepository } from "../Repositories/RhytmRepository";
import * as path from 'node:path';
import { projectPaths } from "../../../../config";
import { RhytmResponseEntity } from "app/Models/RhytmResponse";

export class RhytmJsonHandlerDS extends IRhytmRepository {
    getResponses(id: number): Promise<RhytmResponseEntity[]> {
        throw new Error("Method not implemented.");
    }

    private readonly RhytmJsonHandler: JsonHandler = new JsonHandler(path.join(projectPaths.jsonDir, 'rhytms.json'));

    get(condition?: { where: object; }): Promise<RhytmEntity[] | null> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<RhytmEntity | null> {
        throw new Error("Method not implemented.");
    }
    create(entity: RhytmEntity): Promise<RhytmEntity | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: RhytmEntity): Promise<RhytmEntity | null> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<RhytmEntity | null> {
        throw new Error("Method not implemented.");
    }
    delete(condition?: {
        where: object;
    }): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getRhytms(): RhytmEntity[] {
        const rhytmsJson = this.RhytmJsonHandler.getJson();
        if (!Array.isArray(rhytmsJson)) {
            throw new Error(`Error reading JSON File`);
        }
        throw new Error("Method not implemented.");
    }
}