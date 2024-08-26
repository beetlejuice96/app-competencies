import Image from "next/image";
import { TsAsset, TsTournament } from "@/types/tournament";

interface CardTournamentProps {
  tournament: TsTournament;
  bannerAsset: TsAsset;
}

const CardTournament: React.FC<CardTournamentProps> = ({
  tournament,
  bannerAsset,
}) => {
  return (
    <div className="card bg-base-100 w-[305px] h-[198px]">
      <figure>
        <Image
          //add classes to make the image is background
          className="absolute inset-0 w-full h-full object-cover"
          src={"https://via.placeholder.com/400x200"} //{urlAssetBanner?.url}
          alt={bannerAsset.key}
          width={400}
          height={200}
        />
      </figure>
      <div
        //add classes to put this div in the bottom of the card
        className="relative
        flex flex-col justify-center items-center
        w-full h-full p-4
        "
      >
        <h2 className="card-title text-xl font-bold">{tournament.name}</h2>
        <p className="text-white font-semibold">
          {tournament.startDate.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600 text-white">
            INSCRIBIRSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardTournament;
