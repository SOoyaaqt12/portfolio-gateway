import nodemailer from 'nodemailer';
import { json } from 'stream/consumers';
import { measureMemory } from 'vm';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});

    }

    const {name, email, subject, message} = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({message: 'semua field wajib diisi!'});
    }

    // gunakan environtment variables (diatur di langkah 4)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `'Portfolio website' <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: subject || 'Pesan baru dari website',
            text: `
            Nama: ${name}
            Email: ${email}
            Pesan: ${message}
            `,
        });

        return res.status(200),json({message: 'Pesan berhasil dikirim!'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Gagal Mengirimkan Pesan!'});
    }
}