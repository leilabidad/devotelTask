import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['jobId'])
export class JobOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobId: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  salary: string;

  @Column('text')
  description: string;

  @Column()
  source: string;
}
