import express from 'express';
import { connectDB } from './DB/index.js';
import dotenv from 'dotenv';
import app from './app.js';
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); 
  });
  import { AggregateGroupByReducers, AggregateSteps, createClient, SchemaFieldTypes } from "ioredis"
  const client = createClient();
  client.on('error', err => console.log('Redis Client Error', err));
  
  await client.connect();
  
