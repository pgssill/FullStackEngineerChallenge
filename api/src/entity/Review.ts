import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'reviewer_id' })
    reviewerId!: User;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'reviewee_id' })
    revieweeId!: User;

    @Column({ type: 'bool', default: false })
    completed!: boolean;

    @Column({ type: 'text', nullable: true })
    content?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt!: Date;
}
