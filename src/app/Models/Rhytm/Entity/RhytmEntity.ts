export class RhytmEntity {
    name: string;
    pattern: RegExp;
    responses: string[];

    constructor(name: string, pattern: string, responses: string[]) {
        this.name = name;
        this.pattern = new RegExp(pattern);
        this.responses = responses;
    }
}
