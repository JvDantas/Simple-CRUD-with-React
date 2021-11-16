import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  //READ  
  useEffect(()=>{
    //requisitando dados do backend
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data);
    })
  },[])

  //CREATE
  const submitReview = () => {
    //Enviando para backend
    Axios.post('http://localhost:3001/api/insert', { 
      movieName: movieName, 
      movieReview: review, 
    });
    
    // atualizando dados da pagina
    setMovieList([...movieReviewList, 
        {movieName: movieName, movie_review: review},
    ]);
  }

  //DELETE
  const deleteReview = (movie) =>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
      // atualizando dados da pagina
  }
  //UPDATE
  const updateReview = (movie) =>{
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie, 
      movieReview: newReview, 
    })
    setNewReview("")
  }
  // VIEW
  return (
    <div className="App">
      <h1>CRUD APLICATION</h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }} />
        <label>Review</label>
        <input type="text" name="review" onChange={(e) => {
          setReview(e.target.value)
        }} />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=>{
          return(
          <div className="card">
           <h1>{val.movieName} </h1>
           <p> {val.movie_review} </p>

           <button onClick={()=> {deleteReview(val.movieName)}}>Delete</button>
           <input type={Text} id="updateInput" onChange={(e)=>{setNewReview(e.target.value)}}/>
           <button onClick={()=> {updateReview(val.movieName)}}>Update</button>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
