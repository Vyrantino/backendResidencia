import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PlantillasModule } from './plantillas/plantillas.module';
import { DocumentosModule } from './documentos/documentos.module';
import { DatosModule } from './datos/datos.module';
import { DatosUsuarioModule } from './datos-usuario/datos-usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm' ; 
import { Datos } from './datos/entities/dato.entity';
import { DatosUsuario } from './datos-usuario/entities/datos-usuario.entity';
import { Departamentos } from './departamentos/entities/departamento.entity';
import { Documentos } from './documentos/entities/documento.entity';
import { Plantilla } from './plantillas/entities/plantilla.entity';
import { Usuarios } from './usuarios/entities/usuario.entity';
import { ModeradoresModule } from './moderadores/moderadores.module';
import { Moderador } from './moderadores/entities/moderador.entity';
import { DatosPlantillaModule } from './datos-plantilla/datos-plantilla.module';
import { DatosPlantilla } from './datos-plantilla/entities/datos-plantilla.entity';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { Administrador } from './administradores/entities/administrador.entity';
import { HttpModule } from '@nestjs/axios/dist/http.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'residencia',
      entities: [
        Datos,
        DatosUsuario,
        Departamentos,
        Documentos,
        Plantilla,
        Usuarios,
        Moderador,
        DatosPlantilla,
        Administrador,
        HttpModule
      ],
      synchronize: true,
    }),
    UsuariosModule, 
    PlantillasModule, 
    DocumentosModule,
    DatosModule, 
    DatosUsuarioModule, 
    ModeradoresModule, 
    DatosPlantillaModule,
    DepartamentosModule,
    AdministradoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
