import { connectDB } from './DB/index.js';
import app from './app.js';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})

redis.on("connect",() => {
  console.log("Redis is Successfully Connected");
})

redis.on("close", () => {
  console.log("Redis Connection is Closed");
  redis.disconnect();
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
  redis.disconnect();
});

const startServer = async () => {
  // await initializeTransporter();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

connectDB()
  .then(async () => {
    await startServer();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

  export {redis}