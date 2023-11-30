import { useState } from 'react';
import './Navbar.css';
import { IconLock, IconAt } from '@tabler/icons-react';
import { Modal, Button, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function Navbar() {
  const [loginOpened, setLoginOpened] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: true,
    },
  });

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <>
      <Modal opened={loginOpened} onClose={() => { setLoginOpened(false); }} title="Login" centered>
        <form onSubmit={form.onSubmit(handleSubmit)} className='auth-modal'>
          <TextInput
            required
            placeholder="Your email"
            label="Email"
            leftSection={<IconAt size={16} stroke={1.5} />}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            placeholder="Password"
            label="Password"
            leftSection={<IconLock size={16} stroke={1.5} />}
            {...form.getInputProps('password')}
          />

          <Button color="blue" type="submit" mt={'md'}>
            Login
          </Button>
        </form>
      </Modal>

      <div className='navbar'>
        <div className='text-section'>
          <h2>Admin Dashboard</h2>
        </div>

        <div className='login-section'>
          <Button onClick={() => { setLoginOpened(true); }}>Log in</Button>
        </div>
      </div>
    </>
  );
}

export default Navbar;