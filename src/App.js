import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './App.css';

import About from './components/About'

//to start: npm run server, npm start (in 2 windows)


// ------------------------------ main app
function App() {

  // const dishes_initial = [
  //   {
  //     name: 'tom kha',
  //     cuisine: 'thai',
  //     description: 'some desc'
  //   },
  //   {
  //     name: 'kimbap',
  //     cuisine: 'korean',
  //     description: 'some desc'
  //   },
  //   {
  //     name: 'mochi',
  //     cuisine: 'japanese',
  //     description: 'some desc'
  //   },
  //   {
  //     name: 'taiyaki',
  //     cuisine: 'japanese',
  //     description: 'some desc'
  //   },
  //   {
  //     name: 'mango rice',
  //     cuisine: 'thai',
  //     description: 'some desc'
  //   }
  // ]
  
  const [dishes, setDishes] = useState([])

  //loading the json db with axios
  useEffect(()=> {
    axios.get('http://localhost:3001/dishes').then(response => setDishes(response.data))
  }, [])

  const cuisines = [...new Set(dishes.map((dish) => dish.cuisine))]
 
  const japaneseFood = dishes.filter(d => d.cuisine === 'japanese')
  const koreanFood = dishes.filter(d => d.cuisine === 'korean')
  const thaiFood = dishes.filter(d => d.cuisine === 'thai')

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home cuisines={cuisines} dishes={dishes} japaneseFood={japaneseFood} koreanFood={koreanFood} thaiFood={thaiFood} />}/>

          <Route path="/about" element={<About />} />
        </Routes>      
      </BrowserRouter>


    </div>
  );
}

const Home = ({cuisines, dishes, japaneseFood, koreanFood, thaiFood}) =>{
  /*
  <div className='maincontentbox'>
          {dishes.map(dish => <Dish dish={dish} />)}
        </div>
        */
  return (
    <div className='pageflexbox'>
        <h1 className='title'>MY WEEB ASS CAFE</h1>
        <div className='bgimage'>
          <img src="https://images.unsplash.com/photo-1602030029545-52959ef2927c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGphcGFuZXNlJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60" />
        </div>

        <div className='cuisineselector'>
          {cuisines.map(c => <Cuisine cuisine={c} />)}
        </div>

        <div className='allcuisines'>
          <div className='cuisinegroupbox'>
            <p>Japanese: </p>
            {japaneseFood.map(dish => <Dish dish={dish} />)}
          </div>

          <div className='cuisinegroupbox'>
            <p>Korean: </p>
            {koreanFood.map(dish => <Dish dish={dish} />)}
          </div>

          <div className='cuisinegroupbox'>
            <p>Thai: </p>
            {thaiFood.map(dish => <Dish dish={dish} />)}
          </div>
        </div>
        
      </div>
  )
}


//----------------------- component for one dish
const Dish = ({dish}) =>{
  return (
    <div className="dish">
      <div>{dish.name}</div>
      <p>add a photo and a flag instead of cuisine name</p>
      <div>{dish.description}</div>
    </div>
  )
}

const Cuisine = ({cuisine}) =>{
  return (
    <div><p> {cuisine} </p></div>
  )
}
export default App;
