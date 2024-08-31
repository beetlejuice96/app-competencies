import NavBar from "./components/navbar/navbar";

export interface PlatformLAyoutProps {
  children: React.ReactNode;
}
const PlatformLayout = ({
  children,
}: PlatformLAyoutProps): React.JSX.Element => {
  return <NavBar>{children}</NavBar>;
};

export default PlatformLayout;
