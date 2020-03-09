// import * as nodemailer from 'nodemailer';
//
// export async function sendEmail() {
//     const transporter = nodemailer.createTransport( {
//         // service: 'gmail',
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         auth: {
//             user: 'conversion.kit.management@gmail.com',
//             pass: '12345Abc',
//         },
//     } );
//
//     const mailOptions = {
//         from: 'conversion.kit.management@gmail.com',
//         to: 'thanapat.koysuwan@nxp',
//         subject: 'Test auto email (Server)',
//         // text: `Test`
//         html: '<h1>Hi</h1><p>Your Messsage</p>',
//     };
//
//     await transporter.sendMail( mailOptions );
// }

const nodemailer = require( 'nodemailer' );

const transporter = nodemailer.createTransport( {
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    authMethod: 'PLAIN',
    auth: {
        user: 'conversion.kit.management@gmail.com',
        pass: '12345Abc',
    },
} );

const mailOptions = {
    from: 'conversion.kit.management@gmail.com',
    to: 's5904022610070@email.kmutnb.ac.th',
    subject: 'Test auto email (Server)',
    // text: `Test`
    html: '<h1>Hi</h1><p>Your Messsage</p>',
};

transporter.sendMail( mailOptions );
