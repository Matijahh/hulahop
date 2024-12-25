import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModules } from './modules/application.module';
import { DataSource } from 'typeorm';
import { dataSource as dataSourceObj } from './core/data-source';
import { CoreModule } from './core/core.module';
import { TranslationModule } from './providers/translation/translation.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    TranslationModule,
    ...ApplicationModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DataSource,
      useFactory: async () => {
        await dataSourceObj
          .initialize()
          .then(() => {
            console.log('Data Source has been initialized successfully.');
          })
          .catch((err) => {
            console.log('Error during Data Source initialization:', err);
          });
        return dataSourceObj;
      },
    },
  ],
})
export class AppModule {}
