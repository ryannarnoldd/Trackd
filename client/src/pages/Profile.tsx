import {
    Container,
    Button
} from 'react-bootstrap';

const Profile = () => {

    return (
        <Container className="text-center mt-5">
            <h1>Profile Statistics</h1>
            <h2>Coming Soon!</h2>

            <Button variant="danger" onClick={() => {
                localStorage.removeItem('id_token');
                window.location.assign('/login');
            }}>Logout</Button>
        </Container>
    );
};

export default Profile;