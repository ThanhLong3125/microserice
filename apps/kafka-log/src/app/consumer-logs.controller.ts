import { Controller } from '@nestjs/common';
import { ConsumerLogsService } from './consumer-logs.service';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';

@Controller()
export class ConsumerLogsController {
  constructor(private readonly consumerLogsService: ConsumerLogsService) {}

  @EventPattern('create-notification')
  handlelog(@Payload() payload: any, @Ctx() context: KafkaContext) {
    this.consumerLogsService.handlelog(payload, context);
  }
}
