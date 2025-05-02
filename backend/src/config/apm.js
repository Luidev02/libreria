import apm from 'elastic-apm-node';
import dotenv from "dotenv";

dotenv.config();
const apmAgent = apm.start({
    serviceName: process.env.APM_SERVICE_NAME || 'localhost',
    secretToken: process.env.APM_SECRET_TOKEN || 'dmK6Exaf4h1LhgCA0z',
    serverUrl: process.env.APM_SERVER_URL || "https://320075c82ec84411a8c3ff3bc445f2cc.apm.us-central1.gcp.cloud.es.io:443", // URL predeterminada o válida
    environment: process.env.APM_ENVIRONMENT || 'development',
    captureBody: 'all',
    logLevel: 'info',
});

if (!process.env.APM_SERVER_URL) {
    console.warn('APM_SERVER_URL no está configurado. Elastic APM está deshabilitado.');
}

export default apmAgent;


