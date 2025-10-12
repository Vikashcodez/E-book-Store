// SalesTimerRibbon.jsx
import React, { useState, useEffect } from 'react';

const SalesTimerRibbon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 3);
    saleEndDate.setHours(23, 59, 59, 999);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = saleEndDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 rounded-lg p-3 min-w-[60px] border border-white/20">
        <div className="text-2xl lg:text-3xl font-bold text-white font-mono">
          {value.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="text-white/80 text-xs mt-2 font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-lavender-600 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Sale Info */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <div className="bg-white/10 px-4 py-1 rounded-full">
                <span className="text-white font-bold text-sm">FLASH SALE</span>
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Winter Reading Sale
            </h3>
            <p className="text-white/80 text-sm max-w-md">
              Get up to 50% off on bestselling books. Limited time offer!
            </p>
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center">
            <div className="text-white/80 text-sm font-medium mb-3">
              Offer ends in:
            </div>
            <div className="flex gap-4">
              <TimeBox value={timeLeft.days} label="Days" />
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <button className="bg-white text-lavender-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTimerRibbon;