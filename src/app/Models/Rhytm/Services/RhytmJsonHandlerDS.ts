import { JsonHandler } from "@tomhuel/jsonhandler";
import { RhytmEntity } from "../Entity/RhytmEntity";
import { RhytmRepository } from "../Repositories/RhytmRepository";
import * as path from 'node:path';
import { projectPaths } from "../../../../config";

export class RhytmJsonHandlerDS extends RhytmRepository {

    private readonly RhytmJsonHandler: JsonHandler = new JsonHandler(path.join(projectPaths.jsonDir, 'rhytms.json'));

    getRhytms(): RhytmEntity[] {
        const rhytmsJson = this.RhytmJsonHandler.getJson();
        if (!Array.isArray(rhytmsJson)) {
            throw new Error(`Error reading JSON File`);
        }
        const rhytms = rhytmsJson.map((rhytm) => new RhytmEntity(rhytm.name, rhytm.pattern, rhytm.responses));
        return rhytms;
    }
}