"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const baseItemTypes = ['pizza', 'ice_cream', 'logo'];

export default function FloatingIngredients() {
  const [elements, setElements] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    // Generate floating elements
    let itemTypes = [...baseItemTypes];
    if (pathname === '/coupons') {
      itemTypes.push('scissors', 'money');
    }

    const newElements = Array.from({ length: 18 }).map((_, i) => {
      const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      const isLogo = type === 'logo';
      return {
        id: i,
        type: type,
        left: Math.random() * 100, // random start horizontal position
        animationDuration: 15 + Math.random() * 20, // between 15s and 35s
        animationDelay: Math.random() * 20, // stagger the start times
        size: isLogo ? 80 + Math.random() * 60 : 30 + Math.random() * 40, // logos are 80-140px, others 30-70px
        direction: Math.random() > 0.5 ? 'float-up-cw' : 'float-up-ccw',
      };
    });
    
    setElements(newElements);
  }, [pathname]);

  if (elements.length === 0) return null;

  return (
    <div className="floating-ingredients-container">
      {elements.map((el) => {
        let content;
        if (el.type === 'pizza') content = '🍕';
        else if (el.type === 'ice_cream') content = '🍦';
        else if (el.type === 'scissors') content = '✂️';
        else if (el.type === 'money') content = '💵';
        else if (el.type === 'logo') content = <img src="/kat_only.png" style={{ width: '100%', height: 'auto', opacity: 0.7 }} alt="Logo" />;

        return (
          <div
            key={el.id}
            className="floating-ingredient"
            style={{
              left: `${el.left}%`,
              width: `${el.size}px`,
              height: `${el.size}px`,
              fontSize: `${el.size}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animationName: el.direction,
              animationDuration: `${el.animationDuration}s`,
              animationDelay: `${el.animationDelay}s`,
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
