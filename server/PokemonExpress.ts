import * as express from 'express'
import * as cors from 'cors'

const app = express()
app.use(cors())
app.listen(3000, () => console.log(`Listening on http://localhost:3000/.`))

app.get(`/getyourpokemon`,async(req,res) =>{
    try{let PokemonName = req.query.name
    const PokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
    const PokeAPIJSON = await PokeAPI.json();
    res.json(PokeAPIJSON)}
    catch (error) {
        res.status(400).json({ message: "Error fetching enemy Pokemon." });
    }
})
app.get(`/getenemypokemon`,async(req,res) =>{
    try{let EPokemonName = req.query.name
    const EPokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${EPokemonName}`)
    const EPokeAPIJSON = await EPokeAPI.json();
    res.json(EPokeAPIJSON)}
    catch (error) {
        res.status(400).json({ message: "Error fetching enemy Pokemon." });
    }
 
})
