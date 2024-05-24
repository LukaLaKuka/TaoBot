import { PrismaClient } from "@prisma/client";
import { Entity } from ".";

export abstract class Repository<T extends Entity> {

    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    abstract getById(id: number | string): Promise<T | null>;
    abstract getAll(): Promise<T[]>;
    abstract create(entity: T): Promise<T | null>;
    abstract update(id: number | string, entity: T): Promise<T | null>;
    abstract delete(entity: T): Promise<T | null>;
    abstract deleteById(id: number | string): Promise<T | null>;

    async disconnect() {
        this.prisma.$disconnect();
    }
}