import { FormEvent, useRef } from 'react';

import useModalContext from 'src/context/ModalContext';

const ContentSignUp = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { closeModal } = useModalContext();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: inputRef.current?.value })
      });

      if (res.ok && inputRef.current) {
        inputRef.current.value = '';
        closeModal();
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

export default ContentSignUp;
