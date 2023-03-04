import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { handleDislike, handleLike } from "../../features/userSlice";

const LikeDislike = ({
  id,
  likes,
  dislikes,
  likeActive,
  dislikeActive,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => dispatch(handleLike(id))}
        className={likeActive ? "activeL" : ""}
      >
        <img alt="" src="./like.png" width="30px" />
      </button>
      <p>{likes}</p>

      <button
        className={dislikeActive ? "activeD" : ""}
        onClick={() => dispatch(handleDislike(id))}
      >
        <img alt="" src="./dislike.png" width="30px" />
      </button>
      <p>{dislikes}</p>
    </>
  );
};

export default LikeDislike;
