import React, { useState, useEffect } from "react";
import {
  IconBeach,
  IconDog,
  IconHearts,
  IconPrinter,
  IconTie,
  IconPacman,
  IconLockPassword,
} from "@tabler/icons-react";
import { IconCircleCheck } from "@tabler/icons-react";

const toneCards = [
  {
    colorClass: "tone-card-orange",
    text: "Casual",
    code: "casual",
    icon: <IconBeach />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-yellow",
    text: "Formal",
    code: "formal",
    icon: <IconPrinter />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-pink",
    text: "Romantic",
    code: "romantic",
    icon: <IconHearts />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-blue",
    text: "Doggie",
    code: "doggie",
    icon: <IconDog />,
    isLock: 0,
  },
  {
    colorClass: "tone-card-purple",
    text: "Professional",
    code: "professional",
    icon: <IconTie />,
    isLock: 1,
  },
  {
    colorClass: "tone-card-green",
    text: "Friendly",
    code: "friendly",
    icon: <IconPacman />,
    isLock: 1,
  },
];

const ToneCard: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const storedTone = localStorage.getItem("tone");
    if (storedTone) {
      setSelected(storedTone);
    }
  }, []);

  const handleSelect = (code: string, isLock: number) => {
    if (isLock === 0) {
      setSelected(code);
      localStorage.setItem("tone", code);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {toneCards.map((card, index) => (
        <div
          key={index}
          className={`relative ${
            card.isLock === 1 ? "cursor-default" : "cursor-pointer"
          } tone-card ${card.colorClass}`}
          onClick={() => handleSelect(card.code, card.isLock)}
        >
          <div
            className={`icon mb-2 text-4xl ${
              card.isLock === 1
                ? "text-slate-400"
                : selected === card.code
                ? "text-green-500"
                : "text-white"
            }`}
          >
            {card.icon}
          </div>
          <div className="flex items-center">
            <p
              className={
                card.isLock === 1
                  ? "text-slate-400"
                  : selected === card.code
                  ? "text-green-500"
                  : "text-white"
              }
            >
              {card.text}
            </p>
            {card.isLock === 0 && selected === card.code && (
              <IconCircleCheck
                size={20}
                color="#22c55e"
                style={{ marginLeft: "8px" }}
              />
            )}
          </div>
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

export default ToneCard;
