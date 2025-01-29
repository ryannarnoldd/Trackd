import {
    Container,
    Card,
    Button,
    Row,
    Col
  } from 'react-bootstrap';
  
  import { useQuery } from '@apollo/client';
  import { QUERY_ME } from '../utils/queries';
  import type { User } from '../models/User';
  import type { Item } from '../models/Item';
  
  const HomePage = () => {
    const { loading, data } = useQuery(QUERY_ME);
  
    const userData: User = data?.me || {};
  
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  
    return (
      <>
        <div className="text-light bg-dark p-5">
          <Container>
            <h1>Welcome to TrackD, {userData.username}!</h1>
          </Container>
        </div>
        <Container>
          {/* Items Section */}
          <h2 className="pt-5">Items</h2>
          <div className="mb-4">
            <Row>
              {userData.items?.length ? (
                userData.items.map((movie: Item) => (
                  <Col md="3" key={movie.itemId}>
                    <Card border="dark">
                      {movie.image ? (
                        <Card.Img
                          src={movie.image}
                          alt={`The cover for ${movie.title}`}
                          variant="top"
                        />
                      ) : null}
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <h5>You have no saved Items!</h5>
              )}
            </Row>
            <Button className="mt-3">Click to Add More</Button>
          </div>
  
          {/* Add New Collections Section */}
          <div className="text-center mt-5">
            <Button className="btn-lg">+ Add New Collections</Button>
          </div>
        </Container>
      </>
    );
  };
  
  export default HomePage;
  