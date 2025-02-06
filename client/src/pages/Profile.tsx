import {
    Container,
    Button
} from 'react-bootstrap';

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries.js";


const Profile = () => {
    const { data } = useQuery(QUERY_ME);

    // Maps through the prices to create an array of prices, then sums them it together.
    function sumPrices(data: any) {
        let total = 0;

        const prices = data?.me.collections.map((collection: { items: any[]; }) => collection.items.map(item => item.price)).flat();
        prices?.forEach((price: number) => total += price); // Sum all prices using a loop
        return total;
      }

    return (
        <Container className="text-center mt-5">
            <h1>Profile Statistics</h1>
            <h2>Total Collections: {data?.me?.collections?.length}</h2>
            <h2>Total Items: {data?.me?.collections?.reduce((total: number, collection: any) => total + collection.items.length, 0)}</h2>
            <h2>Total Value: ${sumPrices(data)}</h2>

            <Button variant="danger" onClick={() => {
                localStorage.removeItem('id_token');
                window.location.assign('/login');
            }}>Logout</Button>
        </Container>
    );
};

export default Profile;