import { useState, useEffect } from 'react'
import { useAuth } from '../../utils/Auth';
import './index.css'
import axios from 'axios';
import { ActionIcon, Group, ScrollArea, Table } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

type Website = {
  url: string;
  name: string;
  companyId: number;
}

const Websites = () => {
  const { isLoggedIn, employeeData } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);

  useEffect(() => {
    if (!isLoggedIn || !employeeData) return;

    const getEmployeeWebsitesData = async (companyId: number) => {
      try {
        const url = `https://localhost:7163/domains/${companyId}`;

        const response = await axios.get(url);

        setWebsites(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    getEmployeeWebsitesData(employeeData.companyId);
  }, [isLoggedIn, employeeData]);

  const websitesRow = websites.map((website) => (
    <Table.Tr key={website.name}>
      <Table.Td>{website.url}</Table.Td>
      <Table.Td>12/01/2024</Table.Td>
      <Table.Td>24</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="light" color="gray" aria-label="Settings">
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
                <Table.Th>Domæne URL</Table.Th>
                <Table.Th>Sidste scan</Table.Th>
                <Table.Th>Cookies</Table.Th>
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