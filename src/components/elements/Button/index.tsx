import { useState } from "react";

interface ButtonProps {
  className?: string;
  id?: string;
  type?: "button" | "submit" | "reset";
  name?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

function Button({ id, type, name, className, children, onClick }: ButtonProps) {
  const [buttonActive, setButtonActive] = useState(false);

  const handleOnClick = () => {
    setButtonActive(true);
    if (onClick) onClick();
  };
  return (
    <div>
      <button
        id={id}
        name={name}
        type={type}
        className={className}
        onClick={handleOnClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
