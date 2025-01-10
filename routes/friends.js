import express from 'express';
import { storeFriends, retrieveFriends } from '../data-handling/friends.js';
const friendsRouter = express.Router();

const friends = retrieveFriends();

friendsRouter.get('/searchFriend/:email', (req, res) => {
    const email = req.params.email;
    console.log(`searching for a friend with email ${email}`);
    // if a friend with the same email found then return that friend object
    const friend = friends.find((friend) => friend.email == email);

    if (friend === undefined) {
        console.log(`Friend ${email} not found`);
        res.json({ 'message': `Friend ${email} not found` });
    }else{
        console.log(`Friend ${email} found`);
        res.json({ friend });
    }
});

friendsRouter.post('/addFriend', (req, res) => {
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
    storeFriends(friends);
    res.json({ 'friends': friends });
});

export default friendsRouter;