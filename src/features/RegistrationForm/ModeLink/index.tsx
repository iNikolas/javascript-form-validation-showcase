import React from "react";
import "./index.css";

interface PropsType {
  suggestion: string;
}

const ModeLink = ({ suggestion }: PropsType): JSX.Element => {
  return <button className="mode-link">{suggestion}</button>;
};

export default ModeLink;
