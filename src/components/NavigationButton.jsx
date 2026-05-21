import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function NavigationButton({ children, to }) {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(to)}>{children}</Button>;
}
