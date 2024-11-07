import React from "react";

interface ToneCardProps {
  colorClass: string;
  text: string;
}

export const ToneCard: React.FC<ToneCardProps> = ({ colorClass, text }) => {
  return <div className={`tone-card ${colorClass}`}>{text}</div>;
};
