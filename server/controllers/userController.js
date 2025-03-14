import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
// import Stripe from 'stripe'
import razorpay from 'razorpay'

//API to register user
const registerUser = async(req, res) => {
    try {
        const{name, email, password} = req.body
        if (!name || !email || !password) {
            return res.json({success:false, message:"Missing Details."})
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Enter a valid email."})
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({success:false, message:"Password must be 8 or more characters."})
        }

        //Hashing user Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        //_id
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for user Login
const loginUser = async(req,res) => {
    try {
        const{email, password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"User does not exist."})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false, message:'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get user profile data
const getProfile = async(req, res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to update user profile
const updateProfile = async (req, res) => {
    try {
        const{userId, name, phone, address, dob, gender} = req.body
        const imageFile = req.file

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({success:false,message:"Data Missing."})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({success:true,message:"Profile Updated."})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to book doctor appointment
const bookAppointment = async (req,res) => {
    try {
        const{userId,docId,slotDate,slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({success:false,message:"Doctor not available."})
        }

        let slots_booked = docData.slots_booked

        // Checking for slots availability
        if (slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false,message:"Slot not available."})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // Save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"Appointment Booked."})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get user appointments for frontend my-appointments page
const listAppointment = async (req,res) => {
    try {
        const{userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to cancel Appointment
const cancelAppointment = async (req,res) => {
    try {
        const{userId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        //Verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false,message:'Unauthorized action.'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        // Releasing doctor slot
        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:'Appointment cancelled.'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // API to make payment for appointment using Stripe
// const paymentStripe = async (req,res) => {
//     try {
//         const{amount} = req.body
//         if(!amount){
            
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }


//RAZORPAY
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
//API to make payment for appointment using Razorpay
const paymentRazorPay = async (req, res) => {

    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found." })
        }

        //Creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        //Creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to verify payment of razorpay
const verifyRazorpay = async (req,res) => {
    try {
        const{razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        // console.log(orderInfo)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment Successful."})
        }else{
            res.json({success:false,message:"Payment failed."})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//STRIPE
// API to make payment for appointment using Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const paymentStripe = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ success: false, message: 'Appointment Cancelled or not found.' });
//         }

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items: [{
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: 'Doctor Appointment',
//                     },
//                     unit_amount: appointmentData.amount * 100,
//                 },
//                 quantity: 1,
//             }],
//             metadata: { appointmentId },
//             success_url: `${process.env.FRONTEND_URL}/success`,
//             cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//         });

//         res.json({ success: true, sessionId: session.id });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // API to verify payment from Stripe webhook
// const verifyStripePayment = async (req, res) => {
//     const sig = req.headers['stripe-signature'];

//     try {
//         const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;
//             const appointmentId = session.metadata.appointmentId;

//             const appointment = await appointmentModel.findByIdAndUpdate(
//                 appointmentId, 
//                 { payment: true },
//                 { new: true }  // Returns the updated appointment
//             );

//             if (!appointment) {
//                 return res.status(404).json({ success: false, message: 'Appointment not found.' });
//             }

//             res.json({ success: true, message: "Payment Successful.", appointment });
//         }
//     } catch (error) {
//         console.error("Error verifying Stripe payment:", error.message);
//         res.status(400).send(`Webhook Error: ${error.message}`);
//     }
// };

export {registerUser, 
    loginUser, 
    getProfile, updateProfile, bookAppointment, 
    listAppointment, cancelAppointment, 
    paymentRazorPay,
    verifyRazorpay,
    // paymentStripe,
    // verifyStripePayment
}