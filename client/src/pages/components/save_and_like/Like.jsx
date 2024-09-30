import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import {
  checkLikedArticle,
  likeArticleUser,
  unlikeArticleUser,
} from "../../../api/ARTICLESAPI";

const likeDisabled = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Click to like article
  </Tooltip>
);

const likeEnabled = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Click to unlike article
  </Tooltip>
);

// eslint-disable-next-line react/prop-types
const Like = ({ articleId }) => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const user_id = user ? user.id : "";
  const article_id = articleId ? articleId : "";
  const data = {
    user_id: user_id,
    article_id: article_id,
  };

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLiked = async () => {
      if (user_id && article_id) {
        try {
          const response = await checkLikedArticle(user_id, article_id);
          if (response.status == 200) {
            setLiked(response.data.liked);
          }
        } catch (error) {
          if (error.response) {
            console.log(error.response);
          }
        }
      }
    };
    checkLiked();
  }, [article_id, user_id]);

  const likeArticle = async () => {
    if (!user_id) window.location.href = "/session/new";
    if (!article_id) return;

    try {
      const response = await likeArticleUser(data);
      if (response.status == 200) {
        setLiked(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const unLikeArticle = async () => {
    if (!user_id) window.location.href = "/session/new";
    if (!article_id) return;

    try {
      const response = await unlikeArticleUser(data);
      if (response.status == 200) {
        setLiked(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <span className="like-article-span">
      {!liked && (
        <span className="disabled-like-article" onClick={likeArticle}>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={likeDisabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path d="M 16.5 5 C 12.916 5 10 7.916 10 11.5 L 10 41.5 C 10 42.063 10.315406 42.579938 10.816406 42.835938 C 11.317406 43.091938 11.919953 43.046797 12.376953 42.716797 L 22.039062 35.759766 C 22.024062 35.506766 22 35.257 22 35 C 22 33.891 22.155969 32.820016 22.417969 31.791016 L 13 38.572266 L 13 11.5 C 13 9.57 14.57 8 16.5 8 L 31.5 8 C 33.43 8 35 9.57 35 11.5 L 35 22 C 36.034 22 37.035 22.134281 38 22.363281 L 38 11.5 C 38 7.916 35.084 5 31.5 5 L 16.5 5 z M 35 24 C 28.925 24 24 28.925 24 35 C 24 41.075 28.925 46 35 46 C 41.075 46 46 41.075 46 35 C 46 28.925 41.075 24 35 24 z M 35 28 C 35.48 28 35.908453 28.305766 36.064453 28.759766 L 37.177734 32 L 40.875 32 C 41.358 32 41.787406 32.308625 41.941406 32.765625 C 42.095406 33.223625 41.939687 33.729484 41.554688 34.021484 L 38.560547 36.292969 L 39.574219 39.539062 C 39.720219 40.005063 39.548391 40.510969 39.150391 40.792969 C 38.955391 40.930969 38.727 41 38.5 41 C 38.263 41 38.025172 40.925391 37.826172 40.775391 L 35 38.660156 L 32.173828 40.775391 C 31.783828 41.068391 31.248609 41.076922 30.849609 40.794922 C 30.451609 40.512922 30.279781 40.005063 30.425781 39.539062 L 31.439453 36.294922 L 28.445312 34.021484 C 28.060312 33.729484 27.904594 33.225578 28.058594 32.767578 C 28.213594 32.309578 28.642 32 29.125 32 L 32.822266 32 L 33.935547 28.759766 C 34.091547 28.305766 34.52 28 35 28 z"></path>
            </svg>
          </OverlayTrigger>
        </span>
      )}
      {liked && (
        <span className="enabled-like-article" onClick={unLikeArticle}>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={likeEnabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path d="M 16.5 5 C 12.916 5 10 7.916 10 11.5 L 10 41.5 C 10 42.063 10.315406 42.579938 10.816406 42.835938 C 11.317406 43.092937 11.918953 43.045797 12.376953 42.716797 L 22.039062 35.759766 C 22.024062 35.506766 22 35.257 22 35 C 22 27.832 27.832 22 35 22 C 36.034 22 37.035 22.134281 38 22.363281 L 38 11.5 C 38 7.916 35.084 5 31.5 5 L 16.5 5 z M 35 24 C 28.925 24 24 28.925 24 35 C 24 41.075 28.925 46 35 46 C 41.075 46 46 41.075 46 35 C 46 28.925 41.075 24 35 24 z M 35 28 C 35.48 28 35.908453 28.305766 36.064453 28.759766 L 37.177734 32 L 40.875 32 C 41.358 32 41.787406 32.308625 41.941406 32.765625 C 42.095406 33.223625 41.939687 33.729484 41.554688 34.021484 L 38.560547 36.292969 L 39.574219 39.539062 C 39.720219 40.005063 39.548391 40.510969 39.150391 40.792969 C 38.955391 40.930969 38.727 41 38.5 41 C 38.263 41 38.025172 40.925391 37.826172 40.775391 L 35 38.660156 L 32.173828 40.775391 C 31.782828 41.068391 31.248609 41.076922 30.849609 40.794922 C 30.451609 40.512922 30.279781 40.005063 30.425781 39.539062 L 31.439453 36.294922 L 28.445312 34.021484 C 28.060312 33.729484 27.904594 33.225578 28.058594 32.767578 C 28.213594 32.309578 28.642 32 29.125 32 L 32.822266 32 L 33.935547 28.759766 C 34.091547 28.305766 34.52 28 35 28 z"></path>
            </svg>
          </OverlayTrigger>
        </span>
      )}
    </span>
  );
};

export default Like;
