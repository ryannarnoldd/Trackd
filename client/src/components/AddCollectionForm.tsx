import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COLLECTION } from '../utils/mutations';
// function to create a new collection.
const AddCollectionForm = () => {
    // uses useState to store the new collection's info.
    const [formState, setFormState] = useState({ title: '', description: '', image: '' });
    // This actually uses the mutation from mutations.ts in the utils folder to create the collection.
    const [createCollection, { error }] = useMutation(CREATE_COLLECTION);
    // updates the form state when you type in something.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value });
    };
    // when the form is submitted, keeps the page from refreshing.
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Form data before mutation:', formState);
      // calls the mutation to create a collection; it either does and will say so, or it throws an error.
      try {
        await createCollection({ variables: { ...formState } });
        setFormState({ title: '', description: '', image: '' });
        alert('Collection added successfully!');
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error('Error details:', e.message);

          alert('There was an error adding the collection.');
        } else {
          console.error('An unknown error occurred:', e);
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formState.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Collection</button>
        {error && <p>Error adding collection: {error.message}</p>}
      </form>
    );
};

export default AddCollectionForm;

