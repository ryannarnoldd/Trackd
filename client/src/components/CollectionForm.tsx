import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COLLECTION } from '../utils/mutations.js';

interface CollectionFormProps {
    showModal: boolean;
    handleClose: () => void;
}

const CollectionForm = ({ showModal }: CollectionFormProps) => {
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    const [createCollection] = useMutation(CREATE_COLLECTION);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
// 
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const randomNum = Math.floor(Math.random() * 200) + 1;
            await createCollection({ 
                variables: { 
                    title: formData.title,
                    description: formData.description, 
                    image: formData.image || `https://picsum.photos/${randomNum}`
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
                <Modal.Title>Add New Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            value={formData.title}
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
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            name="image"
                            value={formData.image}
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

export default CollectionForm;
