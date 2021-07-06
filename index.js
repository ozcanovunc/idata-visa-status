require('dotenv').config();

const IDATA_API = constructApiUrl();
const nodemailer = require('nodemailer');
const axios = require('axios');
const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

let lastStatus = '';

setInterval(() => {
    axios.get(IDATA_API)
        .then(({ data }) => {
            if (lastStatus !== data) {
                dropMail(lastStatus = data);
            }
        });
}, process.env.INTERVAL);

function constructApiUrl() {
    return `https://idata.com.tr/de/tr/app/${process.env.PASSPORT}/${process.env.BARCODE}`;
}

async function dropMail(data) {
    await transporter.sendMail({
        to: `${process.env.APPLICANT_EMAIL}, ${process.env.SMTP_EMAIL}`,
        subject: "Application Status 👻",
        text: data.split("#")[1]
    });
}
