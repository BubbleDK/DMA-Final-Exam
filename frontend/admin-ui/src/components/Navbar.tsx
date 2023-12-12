import './Navbar.css';
import { IconLock, IconAt } from '@tabler/icons-react';
import { Modal, Button, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Login, { useAuth } from '../utils/Auth';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async () => {
    const email = form.values.email;
    const password = form.values.password;

    if (await Login(email, password)) {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <Modal opened={!isLoggedIn} onClose={() => {  }} title="Login" centered>
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
          {isLoggedIn && <p>User is logged in</p>}
        </div>
      </div>
    </>
  );
}

export default Navbar;