import { INavItem } from "./nav-item.interface";

export const NavItem: React.FC<INavItem> = ({
  label,
  //   children,
  href,
  onClick,
}) => {
  return (
    <li className="nav-item">
      <a className="nav-link " href={href} onClick={onClick}>
        {label}
      </a>
    </li>
  );
};

export default NavItem;
