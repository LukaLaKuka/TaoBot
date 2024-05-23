import { PrismaClient } from "@prisma/client";
import { Entity } from ".";

export abstract class Repository<T extends Entity> {

    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    abstract getById(id: number | string): Promise<T>;
    abstract getAll(): Promise<T[]>;
    abstract create(entity: T): Promise<T>;
    abstract update(id: number | string, entity: T): Promise<T>;
    abstract delete(entity: T): Promise<T>;
    abstract deleteById(id: number | string): Promise<T>;

    async disconnect() {
        this.prisma.$disconnect();
    }
}