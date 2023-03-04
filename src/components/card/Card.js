import { useDispatch } from "react-redux/es/exports";
import { deleteItem } from "../../features/userSlice";
import LikeDislike from "./LikeDislike";
import React, { useState } from "react";

const Card = ({  id, likes, dislikes, title, category ,likeActive ,dislikeActive }) => {
  const dispatch = useDispatch();
  
  return (
    <div className="tc  dib br3 pa3 ma2  bw2 shadow-5">
      <img
        alt="robots"
        src={`https://robohash.org/${id}?2000*200`}
        width="250px"
      />
      <div>
        <h2> {title} </h2>
        <h3>{category} </h3>

        <LikeDislike likes={likes} dislikes={dislikes}  id={id} likeActive={likeActive} dislikeActive={dislikeActive} />

        <button
          onClick={() => {
            dispatch(deleteItem(id));
          }}
          className="bt br4 ph3 pv1  ba black  grow pointer bbc bt"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Card;
