const express = require('express');
const cors = require('cors');
const app = express()

const { v4: uuidv4} = require('uuid');

app.use(cors());
app.use(express.json());

let movies = [
    {id: uuidv4(), title: 'Avatar', year: 1972 , director: 'Manuel' , genre: 'Crime'},
    {id: uuidv4(), title: 'Iron Man', year: 2010 , director: 'Andrey' , genre: 'Drama'},
    {id: uuidv4(), title: 'Superman', year: 2022 , director: 'Oscar' , genre: 'Action'},
];


app.get('/movies/', (req,res)=>{
    res.json(movies);
} );


app.get('/movies/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id);
    
    if(movie){
        res.json(movie);
    }else{
        res.status(404).send('Movie not found')
    }

} );


app.post('/movies/', (req,res)=>{
    const movie = req.body;

    if (!movie.title || !movie.director || !movie.genre || !movie.year){
        return res.status(400).json({error:'Mising required fileds'});

    }else{
        movie.id = uuidv4();
        movies.push(movie);
        res.json(movie);
    }

} );


const port = 3001;
app.listen(port, ()=>{
    console.info(`☢ Server running on port ${port} ☢`);
});
