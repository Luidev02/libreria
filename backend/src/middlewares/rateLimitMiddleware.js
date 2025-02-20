import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo 5 intentos
    message: { error: 'Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.' },
    headers: true, 
  });


  export const messageLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 10, // Máximo 10 mensajes por minuto
    message: { error: 'Has alcanzado el límite de mensajes por minuto.' },
  });