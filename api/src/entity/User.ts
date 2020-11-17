import { IsBoolean, MinLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'first_name' })
    @MinLength(1)
    firstName!: string;

    @Column({ name: 'last_name' })
    @MinLength(1)
    lastName!: string;

    @Column({ name: 'is_admin' })
    @IsBoolean()
    isAdmin!: boolean;
}
