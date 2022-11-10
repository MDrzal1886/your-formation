import { useRouter } from 'next/router';

const SetPassword = () => {
  const { query } = useRouter();
  console.log(query);
  return <div>Token</div>;
};

export default SetPassword;
