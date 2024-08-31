import Image from "next/image";
import { TsAsset, TsTournament } from "@/types/tournament";
//FIXME: remove this imports. the images should be passed as a url inside bannerAsset
import StumbleGuyImg from "@/assets/img-games/stumble-guy.svg";
import FreeFireImg from "@/assets/img-games/free-fire.svg";
import BrawlStars from "@/assets/img-games/brawl-stars.svg";

interface CardTournamentProps {
  tournament: TsTournament;
  bannerAsset: TsAsset;
}

const CardTournament: React.FC<CardTournamentProps> = ({
  tournament,
  bannerAsset,
}) => {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const getGameImage = (gameId: number) => {
    switch (gameId) {
      case 1: // Assuming 1 is for Brawl Stars
        return BrawlStars;
      case 2: // Assuming 2 is for another game, e.g., Free Fire
        return FreeFireImg;
      case 3: // Assuming 3 is for another game, e.g., Stumble Guys
        return StumbleGuyImg;
    }
  };

  const getGradient = (gameId: number) => {
    switch (gameId) {
      case 1: // Assuming 1 is for Brawl Stars
        return "from-[#28F630] via-[#6952F9] to-[#152AE8]";
      case 2: // Assuming 2 is for another game, e.g., Free Fire
        return "from-[#FF18E8] via-[#B935F8] to-[#29BDFD]";
      case 3: // Assuming 3 is for another game, e.g., Stumble Guys
        return "from-[#FFE600] via-[#B0F977] to-[#FF5D02]";
    }
  };

  return (
    <div
      className={`w-[305px] h-[198px] rounded-md bg-gradient-to-r ${getGradient(
        tournament.gameId
      )} p-[1px]`}
    >
      <div className="h-full w-full bg-gray-800 rounded-md relative overflow-hidden">
        <Image
          src={getGameImage(tournament.gameId)}
          alt={bannerAsset.key}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 h-[66px] flex flex-col items-center justify-center bg-gradient-to-tr from-[#C479FF]/50 to-[#C479FF]/20 backdrop-blur-sm rounded-b-md">
          <h2 className="text-white text-l font-bold">
            {tournament.name} - {formatDate(tournament.startDate)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardTournament;
