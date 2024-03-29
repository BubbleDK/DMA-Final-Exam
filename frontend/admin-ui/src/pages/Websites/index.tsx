import { useState, useEffect } from 'react'
import { useAuth } from '../../utils/Auth';
import './index.css'
import axios from 'axios';
import { ActionIcon, Group, ScrollArea, Table } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

type Website = {
  url: string;
  name: string;
  companyId: number;
  cookieAmount: number;
}

const Websites = () => {
  const { isLoggedIn, employeeData } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsYXJzQGxhcnMuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJjYWZlNGE4OS0wMjE4LTRiNjItODA5MC00NjA2MmI2ZmFmM2EiLCJleHAiOjIwMTg1OTYwNTR9.vMlBM98uD0gi8VKRRTgOK7ePQ4A5eQaRerGJjAYTp9I",
    },
  };

  const handleIconClick = (websiteName: string, domainURL: string) => {
    navigate(`/subpage/${websiteName}?url=${encodeURIComponent(domainURL)}`);
  };

  useEffect(() => {
    if (!isLoggedIn || !employeeData) return;

    const getEmployeeWebsitesData = async (companyId: number) => {
      try {
        const url = `https://localhost:7163/api/Domains/${companyId}`;

        const response = await axios.get(url, config);

        setWebsites(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    getEmployeeWebsitesData(employeeData.companyId);
  }, [isLoggedIn, employeeData]);

  const websitesRow = websites.map((website) => (
    <Table.Tr key={website.name}>
      <Table.Td>{website.name}</Table.Td>
      <Table.Td>{website.url}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="light" color="gray" aria-label="Settings" onClick={() => handleIconClick(website.name, website.url)}>
            <IconSettings size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  if (!isLoggedIn) return null;

  return (
    <div className="websites-container">
      <div className='websites-wrapper'>
        <h2>Domæneoversigt</h2>
        <ScrollArea h={400}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Domæne navn</Table.Th>
                <Table.Th>Domæne URL</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{websitesRow}</Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

export default Websites;