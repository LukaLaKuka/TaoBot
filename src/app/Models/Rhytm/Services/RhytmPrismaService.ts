import { PrismaClient } from "@prisma/client";
import { IRhytmRepository } from "../Repositories/RhytmRepository";
import { RhytmEntity } from "..";
import { RhytmResponseEntity } from "../../RhytmResponse";

export class RhytmPrismaService extends IRhytmRepository {

    private readonly prisma = new PrismaClient()['rhytm'];

    async get(condition?: { where: object, include?: {} }): Promise<RhytmEntity[] | RhytmEntity | null> {
        let res = await this.prisma.findMany(condition);
        if (!res) return null;
        if (res.length > 1) {
            return res.map(r => RhytmEntity.rhytmFromPrisma(r));
        }
        if (res.length === 0) return null;
        return RhytmEntity.rhytmFromPrisma(res[0]);
    }

    async getById(id: number): Promise<RhytmEntity | null> {
        let res = await this.prisma.findUnique({
            where: {
                id
            }
        });
        if (!res) return null;
        return RhytmEntity.rhytmFromPrisma(res);
    }

    async create(entity: RhytmEntity): Promise<RhytmEntity | null> {
        let res = await this.prisma.create({
            data: {
                ...entity,
                pattern: entity.pattern.source,
                id: undefined
            }
        });
        if (!res) return null;
        return RhytmEntity.rhytmFromPrisma(res);
    }

    async update(id: number, entity: RhytmEntity): Promise<RhytmEntity | null> {
        let res = await this.prisma.update({
            where: {
                id
            },
            data: {
                ...entity,
                pattern: entity.pattern.source,
                id
            }
        });
        if (!res) return null;
        return RhytmEntity.rhytmFromPrisma(res);
    }

    async deleteById(id: number): Promise<RhytmEntity | null> {
        let res = await this.prisma.delete({
            where: {
                id
            }
        });
        if (!res) return null;
        return RhytmEntity.rhytmFromPrisma(res);
    }

    async delete(condition?: { where: object; }): Promise<void> {
        await this.prisma.deleteMany(condition);
    }

    async getResponses(id: number): Promise<RhytmResponseEntity[] | null> {
        let responses = await this.prisma.findUnique({
            where: {
                id
            },
            include: {
                rhytms: true
            }
        });
        if (!responses) return null;
        return responses.rhytms.map(res => {
            return RhytmResponseEntity.rhytmresponseFromPrisma(res);
        });
    }
}