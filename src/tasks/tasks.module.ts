import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { JobOffersModule } from '../job-offers/job-offers.module';

@Module({
  imports: [ScheduleModule.forFeature(), JobOffersModule],
  providers: [TasksService],
})
export class TasksModule {}
