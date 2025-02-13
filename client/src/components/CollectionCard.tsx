import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ItemForm from "../components/ItemForm.js";
import { DELETE_COLLECTION, DELETE_ITEM } from "../utils/mutations.js";
import { QUERY_ME } from "../utils/queries.js";
import { useMutation } from "@apollo/client";

interface Item {
  _id: string;
  name: string;
  description?: string;
  price: number;
}

interface Collection {
  _id: string;
  title: string;
  description: string;
  image: string;
  items: Item[];
}

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [deleteCollection] = useMutation(DELETE_COLLECTION, { refetchQueries: [QUERY_ME, 'Me'] });
  const [deleteItem] = useMutation(DELETE_ITEM, { refetchQueries: [QUERY_ME, 'Me'] });

  // Deletes the collection.
  const handleDeleteCollection = async () => {
    try {
      await deleteCollection({ variables: { collectionId: collection._id } });
    } catch (err) {
      console.error('Error deleting collection:', err);
    }
  };

  return (
    <Card style={{ position: "relative" }}>
      <Button
        onClick={handleDeleteCollection}
        variant="danger"
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          padding: "0",
          fontSize: "0.8rem",
          lineHeight: "1",
        }}
      >
        X
      </Button>
      <Card.Img variant="top" src={collection.image} alt={collection.title} />
      <Card.Body>
      <Card.Title>
          {collection.title} $
          {collection.items && collection.items.length > 0 
              ? collection.items.reduce((sum, item) => sum + item.price, 0) 
              : 0}
        </Card.Title>
        <Card.Text>{collection.description}</Card.Text>

        {/* Display collection items */}
        <ul>
          {collection.items.map((item) => (
            <b key={item._id}>
              {/* Add a small tiny X button that will delete the item. */}
              <li> {item.name} {item.price > 0 ? `($${item.price})` : ''}{' '}
                {/* Deletes Item. */}
                <Button onClick={async () => {
                  await deleteItem({ variables: { collectionId: collection._id, itemId: item._id } })
                }} variant="danger">X</Button>
              </li>
            </b>
          ))}
        </ul>

        <div className="text-center mt-5">
          <Button onClick={() => setShowItemModal(true)} variant="success">
            + Add New Item
          </Button>
        </div>

        {/* Modal for adding items */}
        <ItemForm
          showModal={showItemModal}
          handleClose={() => setShowItemModal(false)}
          collectionId={collection._id}
        />
      </Card.Body>
    </Card>
  );
};

export default CollectionCard;
