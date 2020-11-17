import { JsonController, Get, Post, Body, Delete, Param, Patch } from 'routing-controllers';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { Review } from '../entity/Review';
import { APIErrorResponse } from '../shared/types/APIErrorResponse';

@JsonController('/reviews')
export class ReviewController {
    private readonly reviewRepository = getRepository(Review);

    @Get()
    list(): Promise<Review[]> {
        return this.reviewRepository.find();
    }

    @Get('/:reviewId')
    findOne(@Param('reviewId') reviewId: number): Promise<Review | undefined> {
        return this.reviewRepository.findOne({ id: reviewId });
    }

    @Post()
    async create(@Body({ validate: true }) review: Review): Promise<Review | APIErrorResponse> {
        try {
            return this.reviewRepository.save(review);
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }

    @Patch()
    async update(
        @Body({ validate: true }) updatePayload: { reviewId: number; content: string },
    ): Promise<UpdateResult | APIErrorResponse> {
        try {
            return this.reviewRepository.update(updatePayload.reviewId, {
                content: updatePayload.content,
                completed: true,
            });
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }

    @Delete()
    delete(@Body() reviewId: number): Promise<DeleteResult> {
        return this.reviewRepository.delete(reviewId);
    }
}
