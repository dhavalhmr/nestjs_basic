import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientService } from './auth/patient.auth.service';
import { PatientController } from './auth/patient.auth.controller';

@Module({
  imports: [],
  controllers: [AppController, PatientController],
  providers: [AppService, PatientService],
})
export class AppModule {}
