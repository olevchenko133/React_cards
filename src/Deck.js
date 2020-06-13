import React, { Component } from 'react';
import Card from "./Card";
import axios from "axios";
import './Deck.css'


const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            drawn: []
        };
        this.getCard = this.getCard.bind(this);
    }


    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
        this.setState({
            deck: deck.data
        });

    }

    async getCard() {
        let id = this.state.deck.deck_id;

        try{
            let CardUrl = `${API_BASE_URL}/${id}/draw/`

            let CardRes = await axios.get(CardUrl);
            if(!CardRes.data.success){
                throw new Error ("No cards remaining"); 
            }

        
     
        let card = CardRes.data.cards[0];
        this.setState(st => ( {
            drawn: [...st.drawn, {
                id: card.code,
                image: card.image,
                name: `${card.value} of ${card.suit}`
            }]
        }));
    }
    catch(err){
        alert(err);
    }
    }

    render() {

        const Cards = this.state.drawn.map(c => (
<Card name={c.name} image={c.image} key={c.id}/>

        ))
        return (
            <div> <h1>Card Dealer</h1>
                <button onClick={this.getCard}> Add Card </button>
<div className="card-area">
{Cards} </div>
            </div>


        )


    }
}

export default Deck;

