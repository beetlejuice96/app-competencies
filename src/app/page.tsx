import GuestGuard from "@/auth/guest-guard";
import { paths } from "@/paths";
import NavBar from "@/platform/components/navbar/nav-bar";
import Image from "next/image";
import Link from "next/link";
import PplayLogo from "@/assets/logo-init.svg";
import HeroImage from "@/assets/hero-image.png";
import { mockTsTournamentsWithAssets } from "@/mocks/tournaments";
import CardTournament from "@/platform/components/card-tournament/card-tournament";
import { TsAsset } from "@/types/tournament";
const LinkButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-black/30 hover:text-white transition duration-100 ease-in-out"
    >
      {children}
    </Link>
  );
};

//TODO: SEPARATE THE HOME IN DIFFERENT COMPONENTS
export default async function Home() {
  return (
    <NavBar>
      <main>
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="w-full max-w-lg">
              <Image
                src={HeroImage}
                alt="PPlay logo"
                width={1000}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="lg:text-left">
              <h1 className="text-4xl font-bold">
                Welcome to <span className="text-secondary">PPlay</span>
              </h1>
              <p className="py-2 text-lg text-gray-500">
                The ultimate gaming event of the summer!
              </p>
              <Link
                href={paths.auth.signIn}
                className="btn btn-primary text-white 
              hidden lg:inline
              "
              >
                Ingresar
              </Link>
            </div>
            <Link
              href={paths.auth.signIn}
              className="btn btn-secondary text-white 
            lg:hidden w-full"
            >
              Ingresar
            </Link>
          </div>
        </div>

        {/* featured events (tournaments)*/}
        <div className="flex flex-col gap-4 mt-10 px-4">
          <h2 className="text-2xl font-bold">
            <span className="text-neutral">Eventos destacados</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-full flex flex-wrap justify-center gap-4">
              {mockTsTournamentsWithAssets.map((tournament) => (
                <CardTournament
                  key={tournament.id}
                  bannerAsset={
                    tournament.assets?.find(
                      (asset) => asset.key === "banner"
                    ) as TsAsset
                  }
                  tournament={tournament}
                />
              ))}
            </div>
          </div>
        </div>

        {/* calendar*/}
        <div className="flex flex-col gap-4 mt-10 px-4">
          <h2 className="text-2xl font-bold">
            <span className="text-primary">Calendario</span>
          </h2>
        </div>

        {/*  FAQ */}
        <div className="flex flex-col gap-4 mt-10 px-4">
          <h2 className="text-2xl font-bold">
            <span className="text-neutral">FAQ</span>
          </h2>
          <div className="collapse collapse-plus bg-neutral">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Como puedo reclamar mi premio?
            </div>
            <div className="collapse-content">
              <p>
                Puedes reclamar tu premio en cualquier momento, incluso antes de
                que comience el evento. Reclama tu premio en el siguiente
                formulario.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus  bg-neutral">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Que requisitos tengo que cumplir como minimo para participar?
            </div>
            <div className="collapse-content">
              <p>
                Para participar en el evento, debes cumplir los siguientes
                requisitos:
              </p>
              <ul>
                <li>Ingresar al evento</li>
                <li>Participar en el evento</li>
                <li>Reclamar tu premio</li>
              </ul>
            </div>
          </div>
          <div className="collapse collapse-plus bg-neutral mb-4">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Como se si se cancela el evento?
            </div>
            <div className="collapse-content">
              <p>
                Todos los participantes recibiran una notificación de
                cancelación del evento.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer bg-secondary text-neutral-content p-10">
        <aside>
          <Image src={PplayLogo} alt="PPlay logo" width={100} height={100} />
          <p>
            Pocket Play Industries Ltd.
            <br />
            Providing the best gaming experience since 2021.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </NavBar>
  );
}
