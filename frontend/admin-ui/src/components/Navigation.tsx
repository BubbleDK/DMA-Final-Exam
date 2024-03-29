import { Flex, Tabs } from '@mantine/core';
import './Navigation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChartArrowsVertical, IconHome, IconWorld } from '@tabler/icons-react';
import { useAuth } from '../utils/Auth';

const links = [
    {link: "/", label: "Home", icon: IconHome},
    {link: "/websites", label: "Websites", icon: IconWorld},
    {link: "/statistics", label: "Statistics", icon: IconChartArrowsVertical}
]

function Navigation() {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (!isLoggedIn) return;

    const link = links.map((value, index) => (
        <Tabs.Tab value={value.link} key={index} onClick={() => navigate(value.link)} data-testid={"test-" + value.label}>
          {value.label}
        </Tabs.Tab>
    ));


    return (
        <div className='navigation-wrapper'>
            <Flex align='center' justify='space-between'>
                <Tabs value={location.pathname} color='indigo'>
                    <Tabs.List style={{ border: "none", height: 60 }}>
                        {link}
                    </Tabs.List>
                </Tabs>
            </Flex>
        </div>
    )
}

export default Navigation;