require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:5500', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
};
// Enable CORS for all origins (for local testing)
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get("/health",(req,res)=>{
    res.json({"message":"ALL OK!"});
});

// console.log("Hello");
app.post('/send-email', async (req, res) => {
    const { name, email,subject, message } = req.body;

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jallwaayu02@gmail.com',       // Replace with your Gmail
            pass: 'ywut mzbg vfuq fsbw',          // Use App Password (see below)
        }
    });

    const mailOptions = {
        from: email,
        to: 'info@jmdtechnocrats.com',            // Where you want to receive contact messages
        subject: `Contact Form Message from ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
