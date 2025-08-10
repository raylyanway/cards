import React, { useEffect, useState } from 'react';
import { Text } from './texts/Text';

interface TimerProps {
  timestamp: number;
}

export const Timer: React.FC<TimerProps> = ({ timestamp }) => {
  const [timeString, setTimeString] = useState<string>('');

  const calculateTimeDifference = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((timestamp - now) / 1000);

    if (diffInSeconds <= 0) return 'Time is up!';

    if (diffInSeconds < 60) {
      return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'}`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      const remainingSeconds = diffInSeconds % 60;
      return `${diffInMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      const remainingMinutes = diffInMinutes % 60;
      return `${diffInHours}:${remainingMinutes.toString().padStart(2, '0')}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      const remainingHours = diffInHours % 24;
      return `${diffInDays}d ${remainingHours}h`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      const remainingDays = diffInDays % 7;
      return `${diffInWeeks}w ${remainingDays}d`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      const remainingDays = diffInDays % 30;
      return `${diffInMonths}m ${remainingDays}d`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    const remainingMonths = Math.floor((diffInDays % 365) / 30);
    return `${diffInYears}y ${remainingMonths}m`;
  };

  useEffect(() => {
    const updateTimer = () => {
      setTimeString(calculateTimeDifference(timestamp));
    };

    // Initial update
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [timestamp]);

  return <Text>{timeString}</Text>;
};
