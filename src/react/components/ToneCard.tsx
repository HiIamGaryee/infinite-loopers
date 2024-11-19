import React from "react";
import {
  IconPacman,
  IconBeach,
  IconDog,
  IconHearts,
  IconPrinter,
  IconTie,
  IconLockPassword,
} from "@tabler/icons-react";

// 1 is locked , 0 is unlocked
const toneCards = [
  {
    colorClass: "tone-card-orange",
    text: "Casual",
    icon: <IconBeach />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-yellow",
    text: "Formal",
    icon: <IconPrinter />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-pink",
    text: "Romantic",
    icon: <IconHearts />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-blue",
    text: "Doggie",
    icon: <IconDog />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-purple",
    text: "Professional",
    icon: <IconTie />,
    isLock: 1,
  },
  {
    colorClass: "tone-card-green",
    text: "Friendly",
    icon: <IconPacman />,
    isLock: 1,
  },
];
export const ToneCard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {toneCards.map((card, index) => (
        <div
          key={index}
          className={`relative ${
            card.isLock === 1 ? "cursor-default" : "cursor-pointer"
          } tone-card ${card.colorClass} `}
        >
          <div
            className={`icon mb-2 text-4xl ${
              card.isLock === 1 ? "text-slate-400" : "text-white"
            }`}
          >
            {card.icon}
          </div>
          <p className={card.isLock === 1 ? "text-slate-400" : "text-white"}>
            {card.text}
          </p>

          {card.isLock === 1 && (
            <div className="absolute inset-0 bg-neutral-600 bg-opacity-80 flex items-center justify-center rounded-lg">
              <IconLockPassword size={35} color="white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
