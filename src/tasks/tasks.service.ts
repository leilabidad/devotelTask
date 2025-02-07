import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JobOffersService } from '../job-offers/job-offers.service';

@Injectable()
export class TasksService {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Cron('0 * * * *') // اجرا در ابتدای هر ساعت
  async handleCron() {
    await this.jobOffersService.fetchAndSaveJobs();
  }
}
