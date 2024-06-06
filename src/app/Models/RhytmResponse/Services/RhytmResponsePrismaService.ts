import { PrismaClient } from "@prisma/client";
import { RhytmResponseEntity } from "../Entity/RhytmResponseEntity";
import { IRhytmResponseRepository } from "../Repositories/RhytmResponseRepository";

export class RhytmResponsePrismaService extends IRhytmResponseRepository {

    private readonly prisma = new PrismaClient()['rhytmResponse'];

    async get(condition?: { where: object; }): Promise<RhytmResponseEntity[] | null> {
        let responses = await this.prisma.findMany(condition);
        return responses.map(res => {
            return RhytmResponseEntity.rhytmresponseFromPrisma(res);
        });
    }

    async getById(id: number): Promise<RhytmResponseEntity | null> {
        let res = await this.prisma.findUnique({
            where: {
                id
            }
        });
        if (!res) {
            return null;
        }
        return RhytmResponseEntity.rhytmresponseFromPrisma(res);
    }

    async create(entity: RhytmResponseEntity): Promise<RhytmResponseEntity | null> {
        let res = await this.prisma.create({
            data: {
                ...entity,
                id: undefined,
            }
        });
        return RhytmResponseEntity.rhytmresponseFromPrisma(res);
    }

    async update(id: number, entity: RhytmResponseEntity): Promise<RhytmResponseEntity | null> {
        let res = await this.prisma.update({
            where: {
                id,
            },
            data: {
                ...entity,
                id: id,
            }
        });
        if (!res) return null;
        return RhytmResponseEntity.rhytmresponseFromPrisma(res);
    }

    async deleteById(id: number): Promise<RhytmResponseEntity | null> {
        let res = await this.prisma.delete({
            where: {
                id
            }
        });
        if (!res) return null;
        return RhytmResponseEntity.rhytmresponseFromPrisma(res);
    }

    async delete(condition?: { where: object; }): Promise<void> {
        await this.prisma.deleteMany(condition);
    }
}