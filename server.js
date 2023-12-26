const express = require('express');
const app = express();

// Custom middleware to check if it's within working hours
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = date.getHours();

    if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 17) {
        next(); // Proceed to the next middleware
    } else {
        res.send('Sorry, the website is only available during working hours (Monday to Friday, 9AM to 5PM).');
    }
};

app.use(express.static('public')); // Serve static files from the public directory

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', './views'); // Set the directory for views

// Routes
app.get('/', checkWorkingHours, (req, res) => {
    res.render('home');
});

app.get('/services', checkWorkingHours, (req, res) => {
    res.render('services');
});

app.get('/contact', checkWorkingHours, (req, res) => {
    res.render('contact');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
