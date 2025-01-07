import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/getCurrentDate', (req, res) => {
    const currentDate = new Date().toLocaleDateString();
    res.send({'currentDate': currentDate});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});