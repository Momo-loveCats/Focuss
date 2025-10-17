import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleClick = () => {
    setShow(true);
  };

  return [show, handleClose, handleClick] as const;
};

export default useModal;
