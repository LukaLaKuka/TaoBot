import { RhytmEntity } from "../Entity/RhytmEntity";

export abstract class RhytmRepository {
    abstract getRhytms(): RhytmEntity[];
}

export class RhytmRepositoryImplementation implements RhytmRepository {
    
    constructor (
        readonly RhytmDataSource: RhytmRepository
    ) {}

    getRhytms(): RhytmEntity[] {
        return this.RhytmDataSource.getRhytms();
    }
}