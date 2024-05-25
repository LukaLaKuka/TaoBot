import { PrismaClient } from "@prisma/client";
import { Repository, Entity } from "..";

export abstract class PrismaRepository<T extends Entity> extends Repository<T> {

    protected readonly prisma: PrismaClient = new PrismaClient();

}