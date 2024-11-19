import React from "react";

interface ToneCardProps {
  colorClass: string;
  text: string;
  icon: React.ReactNode;
}

export const ToneCard: React.FC<ToneCardProps> = ({
  colorClass,
  text,
  icon,
}) => {
  return (
    <div
      className={`tone-card ${colorClass} text-center flex flex-col items-center justify-center p-4 rounded-lg`}
    >
      <div className="icon mb-2 text-4xl">{icon}</div>
      <p>{text}</p>
    </div>
  );
};
