import { useParams, useLocation } from 'react-router-dom';
import './Subpage.css'
import { Button } from '@mantine/core';
import axios from 'axios';

type RouteParams = {
    websiteName: string;
};

const Subpage = () => {
    const { websiteName } = useParams<RouteParams>();
    const location = useLocation();

    const getQueryParams = (query: string) => {
        return new URLSearchParams(query);
    };

    const queryParams = getQueryParams(location.search);
    const domainURL = queryParams.get('url');

    function handleScanClick() {
        if (domainURL === null) return console.log('Couldnt find domainURL');

        // Make axios request below
        axios.post("http://localhost:5000/api/cookies/" + domainURL)
    }

    return (
        <div className='Subpage-wrapper'>
            <div className='top-content'>
                <h2>Subpage for {websiteName}</h2>
                <Button variant="light" color="gray" onClick={() => { handleScanClick(); }}>Scan for cookies</Button>
            </div>
        </div>
    );
};

export default Subpage;