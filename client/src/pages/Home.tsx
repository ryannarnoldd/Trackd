import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import CollectionForm from '../components/CollectionForm.js';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error } = useQuery(QUERY_ME);

    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);

    return (
        <Container style={{ marginTop: '20px' }}>
            <h1 className="text-center">Collections</h1>

            

            {/* Display the list of collections in cards with title, description, and image */}
            {/* If there are no collections, display a message saying so */}
            {/* If there is an error, display an error message */}
            {/* If the data is loading, display a loading message */}

            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>Error: {error.message}</h2>
            ) : data.me.collections.length ? (
                data.me.collections.map((collection: any) => (
                    <div key={collection._id} className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={collection.image} alt={collection.title} style={{ width: '100%' }} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{collection.title}</h5>
                                    <p className="card-text">{collection.description}</p>
                                    <Button variant="primary">View Collection</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h2>No collections found</h2>
            )}

            <div className="text-center mt-5">
                <Button className="btn-lg" onClick={() => setShowModal(true)}>+ Add New Collection</Button>
            </div>

            <CollectionForm showModal={showModal} handleClose={() => setShowModal(false)} />
        </Container>
    );
};

export default Home;
