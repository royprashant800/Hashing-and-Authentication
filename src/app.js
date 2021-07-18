const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const conn = require('./db/conn');
const User = require('./models/userMessage');
const { hash } = require('bcryptjs');
const bcrypt = require('bcryptjs')
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.post('/login', (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            })
            user.save();
            res.status(201).render('login');
        } else {
            res.send('Password is not matching');
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.post('/home', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await User.findOne({email: email});
        const isMatch = await bcrypt.compare(password, useremail.password);

        if (isMatch) {
            res.status(201).render('home');
        } else {
            res.send('Invalid password');
        }
    } catch (error) {
        res.status(400).send("Invalid login deatils")
    }
})


const getData = async () => {
    const res = await User.find();
    console.log(res[2]);
}

getData();

app.listen(port, () => {
    console.log('app is running')
})