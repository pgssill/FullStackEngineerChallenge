import { JsonController, Get, Post, Body, Put, Delete } from 'routing-controllers';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { APIErrorResponse } from '../shared/types/APIErrorResponse';

@JsonController('/users')
export class UserController {
    private readonly userRepository = getRepository(User);

    @Get()
    list(): Promise<User[]> {
        return this.userRepository.find();
    }

    @Post()
    async create(@Body({ validate: true }) user: User): Promise<User | APIErrorResponse> {
        try {
            return this.userRepository.save(user);
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }

    @Put()
    update(@Body({ validate: true }) user: User): Promise<UpdateResult> {
        return this.userRepository.update(user.id, user);
    }

    @Delete()
    delete(@Body() userId: number): Promise<DeleteResult> {
        return this.userRepository.delete(userId);
    }
}
