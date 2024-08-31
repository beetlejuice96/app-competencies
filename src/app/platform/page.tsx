import { mockTsTournamentsWithAssets } from "@/mocks/tournaments";
import CardTournament from "@/platform/components/card-tournament/card-tournament";
import { TsAsset } from "@/types/tournament";

export default function Page(): React.JSX.Element {
  return (
    <div className=" h-full flex flex-col justify-center items-center space-y-2">
      <div className="carousel carousel-center  rounded-box max-w-sm space-x-7">
        {mockTsTournamentsWithAssets.map((tournament) => (
          <div key={tournament.id} className="carousel-item">
            <CardTournament
              bannerAsset={
                tournament.assets?.find(
                  (asset) => asset.key === "banner"
                ) as TsAsset
              }
              tournament={tournament}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
