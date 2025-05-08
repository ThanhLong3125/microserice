import { Injectable, Logger } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConsumerLogsService {
  private readonly logger = new Logger(ConsumerLogsService.name);
  private readonly logFilePath: string;

  constructor() {
    const logDir = path.resolve(process.cwd(), 'log');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    this.logFilePath = path.join(logDir, 'kafka.log');
  }

  handlelog(payload: any, context: KafkaContext): void {
    const message = {
      topic: context.getTopic(),
      partition: context.getPartition(),
      timestamp: new Date().toISOString(),
      payload,
    };

    this.logger.log(`Kafka's message: ${JSON.stringify(message)}`);

    // Ghi vào file 
    const logEntry = `[${message.timestamp}] [${message.topic}] Partition ${message.partition}: ${JSON.stringify(payload)}\n`;
    fs.appendFileSync(this.logFilePath, logEntry, 'utf8');
  }
}
