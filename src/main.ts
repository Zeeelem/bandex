import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

console.log(process.env);

async function bootstrap() {
  const PORT = process.env.PORT || 5555;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api/v1");
  app.enableCors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });

  await app.listen(PORT, () => {
    console.log(`-*-*- Server started on port - ${PORT} -*-*-`);
  });
}
bootstrap();
