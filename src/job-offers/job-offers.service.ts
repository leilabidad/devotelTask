import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobOffer } from './job-offer.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JobOffersService {
  constructor(
    @InjectRepository(JobOffer)
    private jobOfferRepository: Repository<JobOffer>,
    private readonly httpService: HttpService,
  ) {}

  async fetchAndSaveJobs() {
    const provider1Data = await this.fetchData('https://assignment.devotel.io/api/provider1/jobs', 'provider1');
    const provider2Data = await this.fetchData('https://assignment.devotel.io/api/provider2/jobs', 'provider2');
    await this.saveJobs([...provider1Data, ...provider2Data]);
  }

  async fetchData(url: string, source: string) {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data.map(job => ({
        jobId: job.id,
        title: job.title || job.position,
        company: job.company || job.employer,
        location: job.location || job.city,
        salary: job.salary || null,
        description: job.description || job.details,
        source,
      }));
    } catch (error) {
      console.error(`Error fetching data from ${source}:`, error);
      return [];
    }
  }

  async saveJobs(jobs: Partial<JobOffer>[]) {
    for (const job of jobs) {
      const existingJob = await this.jobOfferRepository.findOne({ where: { jobId: job.jobId } });
      if (!existingJob) {
        await this.jobOfferRepository.save(job);
      }
    }
  }

  async getJobOffers(filters: any, page: number, limit: number) {
    const query = this.jobOfferRepository.createQueryBuilder('job');

    if (filters.title) {
      query.andWhere('job.title LIKE :title', { title: `%${filters.title}%` });
    }
    if (filters.location) {
      query.andWhere('job.location LIKE :location', { location: `%${filters.location}%` });
    }
    if (filters.salary) {
      query.andWhere('job.salary >= :salary', { salary: filters.salary });
    }

    query.skip((page - 1) * limit).take(limit);
    return query.getMany();
  }
}
