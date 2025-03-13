const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contacts.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'viktor.moroz-pi2102@kep.nung.edu.ua',
        pass: 'pbkdmabxpbinwgrl'
    }
});

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from: email,
        to: 'viktor.moroz-pi2102@kep.nung.edu.ua',
        subject: 'Нове повідомлення з форми безкоштовної консультації',
        html: `
            <h2>Нове повідомлення від ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Повідомлення:</strong></p>
            <p>${message}</p>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Помилка при відправці листа');
        }
        const clientMailOptions = {
            from: 'viktor.moroz-pi2102@kep.nung.edu.ua',
            to: email,
            subject: 'Підтвердження запису на консультацію Rise Finance.',
            html: `
                <h2>Дякуємо за звернення, ${name}!</h2>
                <p>Ваш запит на безкоштовну консультацію був успішно надісланий. Ми зв'яжемося з вами найближчим часом.</p>
                <p><strong>Ваше повідомлення:</strong></p>
                <p>${message}</p>
                <p>З найкращими побажаннями, команда Rise Finance.</p>
            `,
        };
        transporter.sendMail(clientMailOptions, (clientError, clientInfo) => {
            if (clientError) {
                return res.status(500).send('Помилка при відправці підтвердження клієнту');
            }
            res.status(200).send('Лист успішно відправлено');
        });
    });
});

app.post('/sendContactForm', (req, res) => {
    const { name, surname, email, phone } = req.body;

    const mailOptions = {
        from: email,
        to: 'viktor.moroz-pi2102@kep.nung.edu.ua',
        subject: 'Нова заявка з форми приєднуйтесь до нашої команди Rise Finance!',
        html: `
            <h2>Кандидат</h2>
            <p><strong>Ім'я:</strong> ${name}</p>
            <p><strong>Прізвище:</strong> ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Помилка при відправці листа');
        }
        res.status(200).send('Лист успішно відправлено');
    });
});

app.post('/send-email', (req, res) => {
    const { serviceName, name, phone, email, format, report } = req.body;
    const clientMailOptions = {
        from: 'viktor.moroz-pi2102@kep.nung.edu.ua',
        to: email,
        subject: `Rise Finance Нове замовлення: ${serviceName}`,
        html: `
            <h2>Деталі замовлення:</h2>
            <p><strong>Послуга:</strong> ${serviceName}</p>
            <p><strong>Ім'я:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Формат консультації:</strong> ${format}</p>
            <p><strong>Потрібен детальний звіт:</strong> ${report}</p>
            <hr>
            <p>Наш менеджер зв’яжеться з вами найближчим часом, щоб уточнити деталі та узгодити час консультації.</p>
            <p>Дякуємо за ваше замовлення!</p>
            <p>З найкращими побажаннями, команда Rise Finance.</p>
        `
    };
    const companyMailOptions = {
        from: 'viktor.moroz-pi2102@kep.nung.edu.ua',
        to: 'viktor.moroz-pi2102@kep.nung.edu.ua',
        subject: `Rise Finance Нове замовлення від ${name}`,
        html: `
            <h2>Нове замовлення для консультації:</h2>
            <p><strong>Послуга:</strong> ${serviceName}</p>
            <p><strong>Ім'я клієнта:</strong> ${name}</p>
            <p><strong>Телефон клієнта:</strong> ${phone}</p>
            <p><strong>Email клієнта:</strong> ${email}</p>
            <p><strong>Формат консультації:</strong> ${format}</p>
            <p><strong>Потрібен детальний звіт:</strong> ${report}</p>
            <hr>
            <p>Будь ласка, зв'яжіться з клієнтом для уточнення деталей і узгодження часу консультації.</p>
        `
    };
    transporter.sendMail(clientMailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Помилка при відправленні листа клієнту' });
        }
        transporter.sendMail(companyMailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Помилка при відправленні листа компанії' });
            }
            res.json({ message: 'Замовлення успішно надіслано!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});