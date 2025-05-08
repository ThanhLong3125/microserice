import { Module } from '@nestjs/common';
import { ConsumerLogsController } from './consumer-logs.controller';
import { ConsumerLogsService } from './consumer-logs.service';

@Module({
  imports: [],
  controllers: [ConsumerLogsController],
  providers: [ConsumerLogsService],
})
export class ConsumerLogsModule {}
