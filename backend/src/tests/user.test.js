import request from "supertest";

import { sequelize } from "../config/db.js";
import app from "../app.js";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Resetear base de datos en cada prueba
});

afterAll(async () => {
  await sequelize.close(); // Cerrar conexión tras pruebas
});

describe("Auth Endpoints", () => {
  test("Debe registrar un usuario correctamente", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Luis Caceres",
      email: "luidev02@hotmail.com",
      password: "123",
      role: "user",
    });

    expect(res.statusCode).toBe(200);
  });

  test("Debe rechazar un login con credenciales incorrectas", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "luidev02@hotmail.com",
      password: "123s",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
