import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
id: '' ,
title: '',
director: '',
metascore: '' ,
stars: '',
  
};

const MovieForm = props => {
  const { id } = useParams();
  const [movie, setMovie] = useState(initialItem);
  const {push} = useHistory(); 
  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  // get the id from params
  // loop through the items list to find the item
  // set the item to state to pre-populate the form\
  useEffect(() => {
    const itemToUpdate = props.movie.find(e => `${e.id}` === id);
    if (itemToUpdate) {
      setMovie(itemToUpdate);
    }
  }, [props.movie, id]);

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios.put(`http://localhost:5000/api/movies/${id}`, movie).then(res => {
    
    console.log('res', res);
    props.setMovie(res.data);
    push(`/movies/${id}`);
  })
    .catch(err => console.log('err', err))
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

       
       
        <input
          type="string"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default MovieForm;
