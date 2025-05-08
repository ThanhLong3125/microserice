// import { Injectable, OnModuleInit } from '@nestjs/common';
// import consul from 'consul';

// @Injectable()
// export class ConsulService implements OnModuleInit {
//   private consulClient = new consul();

//   async onModuleInit() {
//     const serviceName = process.env.SERVICE_NAME || 'user-service';
//     const serviceId = `${serviceName}-${Math.floor(Math.random() * 1000)}`;

//     await this.consulClient.agent.service.register({
//       name: serviceName,
//       id: serviceId,
//       address: 'localhost',
//       port: Number(process.env.PORT) || 3001,
//       check: {
//         http: `http://localhost:${process.env.PORT || 3001}/health`,
//         interval: '10s',
//         timeout: '5s',
//       },
//     });

//     console.log(`[Consul] Registered ${serviceName} with ID: ${serviceId}`);
//   }
// }
