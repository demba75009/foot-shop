import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Testimonial = ({ name, rating, comment }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Header>{name}</Card.Header>
    <Card.Body>
      <Card.Text>{comment}</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Note : {rating}/5</ListGroup.Item>
    </ListGroup>
  </Card>
);

export default Testimonial;
