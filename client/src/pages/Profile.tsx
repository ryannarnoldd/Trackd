import {
    Container,
    Button
} from 'react-bootstrap';

const Profile = () => {
    const userData = {
        username: 'testUser',
        email: 'firferj@gmail.com',
        items: [
            {
                price: 10,
            },
            {
                price: 15,
            },
            {
                price: 15,
            },
        ],
    };

    const totalDollars = userData.items.reduce((total, item) => total + item.price, 0);

    return (
        <Container className="text-center mt-5">
            <h1>Profile Statistics</h1>
            <h2>Total Dollars in Collection: ${totalDollars}</h2>

            <Button className="mt-4" style={{ backgroundColor: 'red', borderColor: 'red' }}>
                Log Out
            </Button>
        </Container>
    );
};

export default Profile;