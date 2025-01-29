import {
    Container,
    Card,
    Button,
} from 'react-bootstrap';

// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import type { User } from '../models/User';
import type { Item } from '../models/Item';

const Home = () => {
    // const { loading, data } = useQuery(QUERY_ME);

    // const userData: User = data?.me || {};

    const userData = {
        username: 'testUser',
        email: 'firferj@gmail.com',
        password: 'password',
        items: [
            {
                itemId: '1',
                title: 'Harry Potter and the Sorcerer\'s Stone',
                description: 'A book about a young wizard',
                price: 10,
                condition: 'new',
                image: 'https://picsum.photos/200',
            },
            {
                itemId: '2',
                title: 'The Great Gatsby',
                description: 'A book about the roaring 20s',
                price: 15,
                condition: 'used',
                image: 'https://picsum.photos/200',
            },
            {
                itemId: '3',
                title: 'The Great Gatsby',
                description: 'A book about the roaring 20s',
                price: 15,
                condition: 'used',
                image: 'https://picsum.photos/200',
            },
        ],
    };

    // if (loading) {
    //   return <h2>LOADING...</h2>;
    // }

    return (
        <Container style={{ marginTop: '20px' }}>
                {userData.items?.length ? ( userData.items.map((item: Item) => (
                        <Card border="dark" className="mb-4" key={item.itemId} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', margin: '0 auto', maxWidth: '95%' }}>
                            <div style={{ textAlign: 'center', flex: 1 }}>
                                <Card.Img
                                    src={item.image}
                                    alt={`The cover for ${item.title}`}
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '0 auto' }}
                                />
                                <Card.Text style={{ marginTop: '10px' }}>{item.description}</Card.Text>
                            </div>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} style={{ border: '1px solid black', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        Thing {index + 1}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))
                ) : (
                    <h5>You have no saved Items!</h5>
                )}

            <div className="text-center mt-5">
                <Button className="btn-lg">+ Add New Collections</Button>
            </div>
        </Container>
    );
};

export default Home;
