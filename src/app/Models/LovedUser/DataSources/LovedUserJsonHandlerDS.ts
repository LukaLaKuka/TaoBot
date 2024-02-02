import { JsonHandler } from "@tomhuel/jsonhandler"
import { projectPaths } from "../../../../config"
import * as path from "node:path"
import { LovedUserRepository } from "../Repositories/LovedUserRepository"
import { LovedUserEntity } from "../Entity/LovedUser";

export class LovedUserJsonHandlerDS extends LovedUserRepository {

    private readonly LovedUserJsonHandler: JsonHandler = new JsonHandler(path.join(projectPaths.jsonDir, 'lovedUsers.json'));

    getLovedUsers(): LovedUserEntity[] {
        const users = this.LovedUserJsonHandler.getJson();
        if (!Array.isArray(users)) {
            throw new Error("The JSON File it's not an Array");
        }
        users.map((user) => {
            return new LovedUserEntity(user.name, user.USER_ID);
        })
        return users;
    }


}