import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRouter from "./routes/user.routes.js"
import productRouter from './routes/product.routes.js';
import { verifyJWT } from './middleware/auth.middleware.js';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())

app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', verifyJWT, productRouter);
// app.use('/api/v1/cart', verifyJWT, cartRoutes);
// app.use('/api/v1/order', verifyJWT, orderRoutes);
// app.use('/api/v1/wishlist', verifyJWT, wishlistRoutes);
// app.use('/api/v1/address', verifyJWT, addressRouter);

export default app;