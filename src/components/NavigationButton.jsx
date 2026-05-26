import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function NavigationButton({ children, to, ...props }) {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(to)}>{children}</Button>;
}
