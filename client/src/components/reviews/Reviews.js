import { useEffect, useRef } from "react";
import api from "../../configs/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const rvText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, [])

  const addReview = async (e) => {
    e.preventDefault();

    const rev = rvText.current;

    try {
      const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
      const updatedReviews = [...reviews, { body: rev.value }];
      rev.value = "";

      setReviews(updatedReviews);
    } catch (error) {
      console.error(error);
    }
  }  

  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm handleSubmit={addReview} rvText={rvText} labelText={"Write a Review ?"} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          { 
            reviews?.map((review) => {              
              return (
                <>
                  <Row>
                    <Col>{review.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews