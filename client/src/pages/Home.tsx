import { useState } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_COLLECTION } from '../utils/mutations.js';
import CollectionForm from '../components/CollectionForm.js';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    // const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    // const [createCollection] = useMutation(CREATE_COLLECTION);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         await createCollection({ variables: { ...formData } });
    //         setShowModal(false);
    //         setFormData({ title: '', description: '', image: '' });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <Container style={{ marginTop: '20px' }}>
            <div className="text-center mt-5">
                <Button className="btn-lg" onClick={() => setShowModal(true)}>+ Add New Collections</Button>
            </div>
            <CollectionForm showModal={showModal} handleClose={() => setShowModal(false)} />
        </Container>
    );
};

export default Home;
