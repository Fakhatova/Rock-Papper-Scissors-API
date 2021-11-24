const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());// midleware to apply for request 

app.locals.players = [
    {
    "id": 1,
    "name": "Fara",
    "wins": 0,
    "losts": 0
}
]



app.listen(
    PORT, () => console.log(`App listening on http://localhost:${PORT}`)
);

app.get('/', (req,res) => {
    res.send('Hello, and welcome... Please add endpoint /players  - to your URL to be able request data from this API')
})

app.get('/players', (req, res) => {
        res.status(200).send(app.locals.players);
});

app.get('/players/:id', (req, res) => {
    const { id }  = req.params;
    const match = app.locals.players.filter(player => player.id == id);

    if (!match) return res.status(404).send({message: `No player found with an id of ${id}`});

    return res.status(200).send(match)
});

app.post('/players/new', (req, res) => {
    const newPlay  = req.body;
    
    const match = app.locals.players.find(player => {

    if(player.id === newPlay.id) {
        return res.status(422).send({message: `User with id  ${newPlay.id} is already registered`})
    }
    
    })

    app.locals.players = [...app.locals.players, newPlay]

    res.status(201).send(newPlay)
});

app.patch('/players/:id', (req, res) => {
    const {id} = req.params
    const {wins, losts} = req.body;

    const matchUpdate = app.locals.players.find(player => player.id == id)

    if(matchUpdate.wins !== wins) {
        matchUpdate.wins = wins
    }else if(matchUpdate.losts !== losts) {
        matchUpdate.losts = losts 
    }

    res.send(matchUpdate); // Returns modified information back to user
})