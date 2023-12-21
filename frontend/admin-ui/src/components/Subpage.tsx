import { useParams, useLocation } from 'react-router-dom';
import './Subpage.css'
import { Button, ScrollArea, Table, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

type RouteParams = {
    websiteName: string;
};

type CookiesType = {
    name: string;
    value: string;
    expirationDate: string;
    domainURL: string;
    category: string;
}

const Subpage = () => {
    const { websiteName } = useParams<RouteParams>();
    const location = useLocation();
    const [cookies, setCookies] = useState<CookiesType[]>([]);
    const config = {
        headers: {
        "Content-Type": "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsYXJzQGxhcnMuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJjYWZlNGE4OS0wMjE4LTRiNjItODA5MC00NjA2MmI2ZmFmM2EiLCJleHAiOjIwMTg1OTYwNTR9.vMlBM98uD0gi8VKRRTgOK7ePQ4A5eQaRerGJjAYTp9I",
        },
    };

    const getQueryParams = (query: string) => {
        return new URLSearchParams(query);
    };

    const queryParams = getQueryParams(location.search);
    const domainURL = queryParams.get('url');

    const handleScanClick = async () => {
        if (domainURL === null) {
            return console.log('Could not find domainURL');
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/cookies/${domainURL}`);
            setCookies(response.data);
        } catch (error) {
            console.error('Error in handleScanClick: ', error);
        }
    };

    useEffect(() => {
        const getCookiesData = async () => {
            try {
                const url = `https://localhost:7163/api/Cookies/${domainURL}`;
                const response = await axios.get(url, config);
                setCookies(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        getCookiesData();
    }, []);

    const cookiesRow = cookies.map((cookie) => (
        <Table.Tr key={cookie.name}>
          <Table.Td>{cookie.name}</Table.Td>
          <Table.Td>{cookie.value}</Table.Td>
          <Table.Td>{new Date(cookie.expirationDate).toLocaleDateString("en-GB")}</Table.Td>
          <Table.Td>{cookie.domainURL}</Table.Td>
          <Table.Td>{cookie.category}</Table.Td>
        </Table.Tr>
      ));

    return (
        <div className='Subpage-wrapper'>
            <div className='top-content'>
                <h2>Subpage for {websiteName}</h2>
                <Button variant="light" color="gray" onClick={() => { handleScanClick(); }}>Scan for cookies</Button>
            </div>

            <p>
                Cookies amount: {cookies.length}
            </p>

            <ScrollArea h={200}>
                <Table>
                    <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Cookie navn</Table.Th>
                        <Table.Th>Cookie value</Table.Th>
                        <Table.Th>Cookie expiration date</Table.Th>
                        <Table.Th>Cookie domainURL</Table.Th>
                        <Table.Th>Cookie Category</Table.Th>
                    </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{cookiesRow}</Table.Tbody>
                </Table>
            </ScrollArea>
        </div>
    );
};

export default Subpage;