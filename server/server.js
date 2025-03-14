import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//Middleware
app.use(express.json())
app.use(cors())

// Add CSP Middleware (Place this here)
// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://js.stripe.com; frame-src https://js.stripe.com; font-src 'self' https://js.stripe.com; style-src 'self' 'unsafe-inline';");
//     next();
// });

//API Endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
// localhost:4000/api/admin/add-doctor

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("Server Started", port))