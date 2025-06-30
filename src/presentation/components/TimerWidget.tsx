import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Platform } from 'react-native';
import { TimeService } from '../../application/services/time';
import { TimeEntity } from '../../domain/entities/time';
import GlobalStyles from '../styles/GlobalStyle';

interface TimerWidgetProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showSeconds?: boolean;
  showDate?: boolean;
}

const TimerWidget: React.FC<TimerWidgetProps> = ({
  position = 'bottom-right',
  showSeconds = true,
  showDate = false
}) => {
  const [timeEntity, setTimeEntity] = useState<TimeEntity | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const timeService = TimeService.getInstance();

  useEffect(() => {
    const unsubscribe = timeService.subscribe((entity: TimeEntity) => {
      setTimeEntity(entity);
      
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });

    if (!timeService.isRunning()) {
      timeService.startTimer();
    }
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      unsubscribe();
    };
  }, [timeService, fadeAnim]);

  const getPositionStyles = () => {
    const base = {
      position: 'absolute' as const,
      zIndex: 1000,
    };

    switch (position) {
      case 'top-left':
        return { ...base, top: Platform.OS === 'ios' ? 60 : 80, left: 20 };
      case 'top-right':
        return { ...base, top: Platform.OS === 'ios' ? 60 : 80, right: 20 };
      case 'bottom-left':
        return { ...base, bottom: 120, left: 20 };
      case 'bottom-right':
        return { ...base, bottom: 20, right: 20 };
      default:
        return { ...base, top: Platform.OS === 'ios' ? 60 : 80, right: 20 };
    }
  };

  const formatDisplayTime = (entity: TimeEntity) => {
    if (!entity) return '';
    
    const time = new Date(entity.timestamp);
    const timeStr = time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: true
    });
    
    if (showDate) {
      const dateStr = time.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      return `${timeStr}\n${dateStr}`;
    }
    
    return timeStr;
  };

  if (!timeEntity) {
    return null;
  }

  return (
    <Animated.View 
      style={[
        GlobalStyles.timerContainer,
        getPositionStyles(),
        { opacity: fadeAnim }
      ]}
    >
      <View style={GlobalStyles.timerContent}>
        <View style={GlobalStyles.timerIndicator} />
        <Text style={GlobalStyles.timerTimeText}>
          {formatDisplayTime(timeEntity)}
        </Text>
        <Text style={GlobalStyles.timerUpdateText}>
          Updates every {timeService.getUpdateInterval() / 1000}s
        </Text>
      </View>
    </Animated.View>
  );
};



export default TimerWidget; 