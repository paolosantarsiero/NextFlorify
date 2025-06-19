import { ButtonInput } from './inputs/ButtonInput';

export const Questions = () => {
  return (
    <div className="flex flex-col">
      <div className="h-[300px] w-full bg-red-500">qui ci va l'immagine</div>
      <div className="w-full">qui ci va la domanda</div>
      <div className=" w-full">
        <ButtonInput />
      </div>
    </div>
  );
};
