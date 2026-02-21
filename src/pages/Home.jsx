import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title as="h1">Welcome to FakeStore</Card.Title>
                <Card.Text className="my-3">
                  Discover a curated selection of products at great prices.
                  Browse our catalog to find items you'll love — from everyday
                  essentials to unique finds.
                </Card.Text>
                <Button variant="primary" onClick={() => navigate("/products")}>
                  View Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
