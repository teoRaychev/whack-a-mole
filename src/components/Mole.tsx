import React from "react";

export const Mole: React.FC<{
  visible: boolean;
  style: object;
  onClick: () => void;
}> = ({ visible, onClick, style }) => {
  /* const [borderColor, setBorderColor] = useState("transparent");

  useEffect(() => {
    if (!visible) setBorderColor("transparent");
  }, [visible]);

  const handleOnMoleClick = () => {
    if (visible) {
      onClick();
      setBorderColor("green");
      setTimeout(() => {
        setBorderColor("transparent");
      }, 750);
    } else {
      setBorderColor("red");
      setTimeout(() => {
        setBorderColor("transparent");
      }, 750);
    }
  };*/
  return (
    <div
      className={`mole ${visible ? "visible" : ""}`}
      style={style}
      onClick={onClick}
    ></div>
  );
};
