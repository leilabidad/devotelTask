import { Controller, Get, Query } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Get()
  async getJobOffers(
    @Query('title') title?: string,
    @Query('location') location?: string,
    @Query('salary') salary?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.jobOffersService.getJobOffers({ title, location, salary }, page, limit);
  }
}
