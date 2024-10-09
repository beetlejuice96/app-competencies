import { IoIosArrowForward } from "react-icons/io";

interface ButtonAuthProviderProps {
  provider: string;
  logo: React.ReactNode;
  onClick: () => void;
}

const ButtonAuthProvider: React.FC<ButtonAuthProviderProps> = ({
  provider,
  onClick,
  logo,
}: ButtonAuthProviderProps) => {
  return (
    <button
      className="btn btn-primary w-full justify-between"
      onClick={onClick}
    >
      {logo} Registrate con {provider} <IoIosArrowForward size={20} />
    </button>
  );
};

export default ButtonAuthProvider;
