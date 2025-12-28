const app = require('./app');
const port = 1012;

app.listen(port, (err) => {
    if (err) {
        return console.error('Server failed to start:', err);
    }
    console.log(`Server is running on http://localhost:${port}`);
});