import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RutinaController} from "./Rutina/rutina.controller";
import {EjerciciosController} from "./Ejercicios/ejercicios.controller";
import {RutinaService} from "./Rutina/rutina.service";
import {AutorizacionController} from "./autorizacion.controller";
import {EjerciciosService} from "./Ejercicios/ejercicios.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./Usuario/usuario.entity";
import {RutinaEntity} from "./Rutina/rutina.entity";
import {EjercicioEntity} from "./Ejercicios/ejercicios.entity";
import {UsuarioController} from "./Usuario/usuario.controller";
import {UsuarioService} from "./Usuario/usuario.service";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'webservidor',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          //ssl: true,
      }),
      TypeOrmModule.forFeature([RutinaEntity,EjercicioEntity,UsuarioEntity])
  ],
  controllers: [
      AppController,
      RutinaController,
      EjerciciosController,
      AutorizacionController,
      UsuarioController],
  providers: [
      AppService,
      RutinaService,
      EjerciciosService,
      UsuarioService
     ],
})

export class AppModule {}
