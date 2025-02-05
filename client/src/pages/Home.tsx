import { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import CollectionForm from "../components/CollectionForm.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries.js";
import CollectionCard from "../components/CollectionCard.js";

const Home: React.FC = () => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const { data, loading, error } = useQuery(QUERY_ME);

  return (
    <Container style={{ marginTop: "20px" }}>
      <h1 className="text-center mb-4">My Collections</h1>

      {loading && <h2 className="text-center">Loading...</h2>}
      {error && <h2 className="text-center text-danger">Error: {error.message}</h2>}

      {data?.me?.collections?.length > 0 ? (
        <Row>
          {data.me.collections.map((collection: any) => (
            <Col md={4} key={collection._id} className="mb-4">

              <CollectionCard collection={collection} />

            </Col>
          ))}
        </Row>
      ) : (
        <h2 className="text-center">No collections found</h2>
      )}

      <div className="text-center mt-5">
        <Button onClick={() => setShowCollectionModal(true)} variant="success">
          + Add New Collection
        </Button>
      </div>

      <CollectionForm showModal={showCollectionModal} handleClose={() => setShowCollectionModal(false)} />
    </Container>
  );
};

export default Home;