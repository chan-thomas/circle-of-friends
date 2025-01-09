import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

const friends = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/getCurrentDate', (req, res) => {
    const currentDate = new Date().toLocaleDateString();
    res.send({'currentDate': currentDate});
});
app.get('/searchFriend/:email', (req, res) => {
    const email = req.params.email;
    console.log(`searching for a friend with email ${email}`);
    // if a friend with the same email found then return that friend object
    const friend = friends.find((friend) => friend.email == email);

    if (friend === undefined) {
        console.log(`Friend ${email} not found`);
        res.json({ 'message': `Friend ${email} not found` });
    }
    res.json({ friend });
});
app.post('/addFriend', (req, res) => {
    console.log(`adding a friend ${req.body.name}`);

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const age = req.body.age;
    const friend = {
        name: name,
        email: email,
        phone: phone,
        age: age
    };
    friends.push(friend);
    res.json({ 'friends': friends });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});