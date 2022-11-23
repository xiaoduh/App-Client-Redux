import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likeJob, unlikeJob } from "../../actions/job.actions";
import { UidContext } from "../AppContext";

const LikeButton = ({ job }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likeJob(job._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikeJob(job._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (job.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, job.likers, liked]);
  //   entre crochet [] relance le useEffect lorsque un des trois params change

  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" alt="like" onClick={like} />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" alt="unlike" onClick={unlike} />
      )}
      <span>{job.likers.length}</span>
    </div>
  );
};

export default LikeButton;
