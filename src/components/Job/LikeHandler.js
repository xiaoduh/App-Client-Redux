import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeJob, unlikeJob } from "../../actions/job.actions";
import { isEmpty } from "../utils";

//notworking

const LikeHandler = ({ idToLike, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const jobData = useSelector((state) => state.jobReducer);
  const [isliked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeJob(userData._id, idToLike));
    setIsFollowed(true);
  };

  const handleUnLike = () => {
    dispatch(unlikeJob(userData._id, idToLike));
    setIsLiked(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsLiked(true);
      } else setIsLiked(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnLike}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Liké</button>
          )}
          {type === "card" && (
            <img src="./img/icons/checked.svg" alt="checked" />
          )}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleLike}>
          {type === "suggestion" && (
            <button className="follow-btn">Liker</button>
          )}
          {type === "card" && <img src="./img/icons/check.svg" alt="check" />}
        </span>
      )}
    </>
  );
};

export default LikeHandler;
