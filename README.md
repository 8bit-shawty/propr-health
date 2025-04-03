<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/8bit-shawty/propr-health">
    <img src="./client/src/assets/screenshot1.png" alt="Logo" width='600'>
  </a>

  <h3 align="center">Propr-Health</h3>

  <p align="center">
    A full-stack MERN application designed to streamline doctor appointments with seamless payment integration via Stripe.
    <br />
    <a href="https://github.com/8bit-shawty/propr-health"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://propr-health.vercel.app/">View Demo</a>
    &middot;
    &middot;
    <a href="https://github.com/your-username/propr-health/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

---

<!-- ABOUT THE PROJECT -->
## About The Project

[![Propr Health Screen Shot][product-screenshot]](https://example.com)

Propr-Health is a modern healthcare appointment booking system built using the MERN stack (MongoDB, Express, React, Node.js). It offers secure user authentication, easy appointment scheduling, and smooth payment processing via Stripe. 

### Key Features:
- User authentication & authorization
- Appointment scheduling system
- Payment processing with Stripe (USD)
- Secure backend with JWT authentication
- Responsive and user-friendly UI
- Deployment support for Vercel(frontend) and Render(backend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project is built with the following technologies:

#### **Frontend**
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
* ![Axios](https://img.shields.io/badge/Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white)
* ![React Toastify](https://img.shields.io/badge/React_Toastify-FFDD00?style=for-the-badge&logo=react-toastify&logoColor=black)

#### **Backend**
* ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
* ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
* ![JWT](https://img.shields.io/badge/JSON_Web_Token-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
* ![Bcrypt](https://img.shields.io/badge/Bcrypt-ABABAA?style=for-the-badge&logo=security&logoColor=black)
* ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
* ![Multer](https://img.shields.io/badge/Multer-FF4C00?style=for-the-badge&logo=multer&logoColor=white)
* ![CORS](https://img.shields.io/badge/CORS-5A29E4?style=for-the-badge&logo=cors&logoColor=white)
* ![Dotenv](https://img.shields.io/badge/Dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

#### **Payments & Deployment**
* ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
* ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
* ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🏥 Client-Side Routes

The frontend of Propr-Health uses React Router for seamless navigation. Below is a breakdown of the available routes:

| Route                   | Description |
|-------------------------|-------------|
| `/`                     | Home page displaying an overview of the application. |
| `/doctors`              | Page listing all available doctors. |
| `/doctors/:speciality`  | Filtered list of doctors based on their specialty. |
| `/login`                | User authentication page (login/signup). |
| `/about`                | Information about the Propr-Health platform. |
| `/contact`              | Contact page to reach out for support or inquiries. |
| `/my-profile`           | User's personal profile and account settings. |
| `/my-appointments`      | List of scheduled appointments for the logged-in user. |
| `/appointment/:docId`   | Booking page for scheduling an appointment with a specific doctor. |

### 🛠️ **Navigation Components**
- `Navbar.jsx` - Persistent navigation bar displayed across all pages.
- `Footer.jsx` - Footer section for additional links and information.
- `ToastContainer` - Provides real-time notifications and alerts.

## 🔑 Admin & Doctor Panel Routes

The Propr-Health platform provides a dedicated panel for both **Admins** and **Doctors** to manage appointments, doctors, and patient interactions.

### 📌 **Admin Routes**
| Route                  | Description |
|------------------------|-------------|
| `/admin-dashboard`     | Overview of the admin panel, displaying key statistics. |
| `/all-appointments`    | View and manage all appointments across the platform. |
| `/add-doctor`         | Form to register a new doctor in the system. |
| `/doctor-list`        | View and manage a list of registered doctors. |

### 📌 **Doctor Routes**
| Route                   | Description |
|-------------------------|-------------|
| `/doctor-dashboard`     | Doctor's dashboard showing an overview of their activity. |
| `/doctor-appointments`  | List of appointments scheduled with the doctor. |
| `/doctor-profile`       | Page to manage the doctor's personal and professional details. |

### 🛠 **Navigation Components**
- `Navbar.jsx` - Persistent navigation bar for authenticated users.
- `Sidebar.jsx` - Sidebar for quick access to admin and doctor functionalities.
- `ToastContainer` - Provides real-time notifications and alerts.
- `Login.jsx` - Authentication page for both admins and doctors.

## Backend API Routes

### User Routes  
`POST /api/users/register`  
Registers a new user  

`POST /api/users/login`  
Authenticates and logs in a user  

`GET /api/users/get-profile`  
Fetches the user's profile (requires authentication)  

`POST /api/users/update-profile`  
Updates user profile (requires authentication)  

`POST /api/users/book-appointment`  
Books an appointment with a doctor (requires authentication)  

`GET /api/users/appointments`  
Retrieves a list of user appointments (requires authentication)  

`POST /api/users/cancel-appointment`  
Cancels an appointment (requires authentication)  

`POST /api/users/payment-razorpay`  
Initiates payment via Razorpay (requires authentication)  

`POST /api/users/verify-razorpay`  
Verifies a Razorpay payment  

`POST /api/users/payment-stripe`  
*Currently commented out* - Initiates payment via Stripe (requires authentication)  

`POST /api/users/verify-stripe-payment`  
*Currently commented out* - Verifies a Stripe payment  

---

### Admin Routes  
`POST /api/admin/add-doctor`  
Adds a new doctor (requires authentication, image upload supported)  

`POST /api/admin/login`  
Authenticates an admin user  

`POST /api/admin/all-doctors`  
Fetches a list of all registered doctors (requires authentication)  

`POST /api/admin/change-availability`  
Changes a doctor's availability status (requires authentication)  

`GET /api/admin/appointments`  
Fetches all appointments for admin review (requires authentication)  

`POST /api/admin/cancel-appointment`  
Cancels an appointment (requires authentication)  

`GET /api/admin/dashboard`  
Fetches admin dashboard statistics (requires authentication)  

---

### Doctor Routes  
`GET /api/doctors/list`  
Fetches a list of all available doctors  

`POST /api/doctors/login`  
Authenticates a doctor  

`GET /api/doctors/appointments`  
Fetches a list of doctor’s appointments (requires authentication)  

`POST /api/doctors/complete-appointment`  
Marks an appointment as completed (requires authentication)  

`POST /api/doctors/cancel-appointment`  
Cancels an appointment (requires authentication)  

`GET /api/doctors/dashboard`  
Fetches the doctor’s dashboard stats (requires authentication)  

`GET /api/doctors/profile`  
Fetches the doctor’s profile (requires authentication)  

`POST /api/doctors/update-profile`  
Updates doctor’s profile (requires authentication)  




