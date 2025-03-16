import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, 
    paymentRazorPay, verifyRazorpay, 
    // paymentStripe, verifyStripePayment 
} from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
//RAZORPAY
userRouter.post('/payment-razorpay',authUser,paymentRazorPay)
userRouter.post('/verify-razorpay',authUser,verifyRazorpay)
//STRIPE
// userRouter.post('/payment-stripe', authUser, paymentStripe)
// userRouter.post('verify-stripe-payment',authUser,verifyStripePayment)



export default userRouter