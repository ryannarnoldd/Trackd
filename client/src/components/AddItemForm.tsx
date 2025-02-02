import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_COLLECTION } from '../utils/mutations';
// this makes collectionId a prop.
const AddItemForm = ({ collectionId }: { collectionId: string }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    condition: '',
    image: '',
  });
  // This uses the mutation ADD_ITEM_COLLECTION from the mutations.ts file in the utils folder.
  const [addItemToCollection, { error }] = useMutation(ADD_ITEM_COLLECTION);
  // updates the form state when you type in something.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  //  when the form is submitted, keeps the page from refreshing.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // trys to add an item to the specified collection, sends collectionId and itemData to the mutation.
    try {
      await addItemToCollection({
        variables: { 
          collectionId, 
          itemData: {
            ...formState, 
            // this converts price to a #.
            price: parseFloat(formState.price)
          } 
        },
      });
      // resets the form state and alerts the user that the item was added.
      setFormState({ title: '', description: '', price: '', condition: '', image: '' });
      alert('Item added successfully!');
    } catch (e) {
      console.error(e);
    }
  };
  // returns the form and then calls handleSubmit, then the input fields, and the submit button.
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Item Title" value={formState.title} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={formState.description} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={formState.price} onChange={handleChange} required />
      <input type="text" name="condition" placeholder="Condition (New/Used)" value={formState.condition} onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" value={formState.image} onChange={handleChange} required />
      <button type="submit">Add Item</button>
      {error && <p>Error adding item.</p>}
    </form>
  );
};

export default AddItemForm;