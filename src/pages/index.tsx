import { FormEvent, useRef } from 'react';

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('api/sign-up', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: inputRef.current?.value })
      });

      if (res.ok && inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          ref={inputRef}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Home;
