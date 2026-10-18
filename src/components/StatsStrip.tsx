import React, { useState, useEffect, useRef } from 'react';
import { Award, Compass, Sparkles, ShieldCheck } from 'lucide-react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * end;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, end]);

  return (
    <span ref={elementRef}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export const StatsStrip: React.FC = () => {
  const stats = [
    {
      icon: Compass,
      target: 12,
      suffix: '+',
      decimals: 0,
      label: 'Years of Interior Craft',
      sub: 'Serving Abuja homeowners & estates',
    },
    {
      icon: Award,
      target: 150,
      suffix: '+',
      decimals: 0,
      label: 'Spaces Furnished in Abuja',
      sub: 'Luxury residences, duplexes & offices',
    },
    {
      icon: Sparkles,
      target: 5.0,
      suffix: ' ★',
      decimals: 1,
      label: 'Google Verified Rating',
      sub: '5-star homeowner reviews in Garki',
    },
    {
      icon: ShieldCheck,
      target: 100,
      suffix: '%',
      decimals: 0,
      label: 'Tailored Fit Guarantee',
      sub: 'Custom curtains & precise drapery',
    },
  ];

  return (
    <section className="py-12 bg-fame-soft border-y border-fame-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2 text-fame-terracotta mb-1">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="font-display font-extrabold text-3xl md:text-4xl text-fame-dark">
                  <AnimatedCounter end={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="text-xs md:text-sm font-bold text-fame-dark tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[11px] text-fame-muted">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
