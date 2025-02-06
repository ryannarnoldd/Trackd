import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../utils/mutations.js';
import { QUERY_ME } from '../utils/queries.js';

interface ItemFormProps {
    showModal: boolean;
    handleClose: () => void;
    collectionId: string;
}

const ItemForm = ({ collectionId, showModal }: ItemFormProps) => {
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });
    const [addItem] = useMutation(ADD_ITEM, { refetchQueries: [QUERY_ME, 'Me'] });

    // On submit.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
// 
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(formData.name);
            // Adds new item.
            await addItem({ 
                variables: { 
                    collectionId: collectionId,
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price)
                }
            });

            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal show={showModal} >
            <Modal.Header>
                <Modal.Title>Add New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ItemForm;