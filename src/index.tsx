import { useLocoStorage } from "./lib";

type Data = {
  id: string;
  name: string;
  amount: number;
  stuff: string[];
};

type Props = {
  data: Data;
};

export const SomeComponent = ({ data }: Props) => {
  const [name, setName] = useLocoStorage<Data>("name", data.name);
  const [amount, setAmount] = useLocoStorage<Data>("amount", data.amount);

  return <div>{name}</div>;
};
