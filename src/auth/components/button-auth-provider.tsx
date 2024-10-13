import { IoIosArrowForward } from "react-icons/io";

interface ButtonAuthProviderProps {
  logo: React.ReactNode;
  text: string;
  onClick: () => void;
}

const ButtonAuthProvider: React.FC<ButtonAuthProviderProps> = ({
  // provider,
  onClick,
  text,
  logo,
}: ButtonAuthProviderProps) => {
  return (
    <button
      className="btn btn-primary w-full justify-between"
      onClick={onClick}
    >
      {logo} {text} <IoIosArrowForward size={20} />
    </button>
  );
};

export default ButtonAuthProvider;
