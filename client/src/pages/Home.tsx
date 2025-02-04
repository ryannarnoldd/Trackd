import { useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import CollectionForm from '../components/CollectionForm.js';
import ItemForm from '../components/ItemForm.js';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';

const Home: React.FC = () => {
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const { data, loading, error } = useQuery(QUERY_ME);

    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);

    return (
        <Container style={{ marginTop: '20px' }}>
            <h1 className="text-center mb-4">My Collections</h1>

            {/* Loading State */}
            {loading && <h2 className="text-center">Loading...</h2>}
            {error && <h2 className="text-center text-danger">Error: {error.message}</h2>}

            {/* Display collections or no collections message */}
            {data?.me?.collections?.length > 0 ? (
                <Row>
                    {data.me.collections.map((collection: any) => (
                        <Col md={4} key={collection._id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={collection.image} alt={collection.title} />
                                <Card.Body>
                                    <Card.Title>{collection.title} ${100}</Card.Title>
                                    <Card.Text>{collection.description}</Card.Text>
                                    {/* Print all the items. */}
                                    <ul>
                                        {collection.items.map((item: any) => (
                                           <b><li key={item._id}>{item.name} (${item.price})</li></b>
                                        ))}
                                        </ul>
                                    
                                    
                                    <div className="text-center mt-5">
                                        <Button onClick={() => setShowItemModal(true)} variant="success">+ Add New Item</Button>
                                    </div>

                                    {/* Modal for adding collection */}
                                    <ItemForm showModal={showItemModal} handleClose={() => setShowItemModal(false)} collectionId={collection._id} />

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <h2 className="text-center">No collections found</h2>
            )}

            {/* Add New Collection Button */}
            <div className="text-center mt-5">
                <Button onClick={() => setShowCollectionModal(true)} variant="success">+ Add New Collection</Button>
            </div>

            {/* Modal for adding collection */}
            <CollectionForm showModal={showCollectionModal} handleClose={() => setShowCollectionModal(false)} />
        </Container>
    );
};

export default Home;
