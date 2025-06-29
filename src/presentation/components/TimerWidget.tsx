import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { TimeService } from '../../application/services/time';
import { TimeEntity } from '../../domain/entities/time';
import { Colors } from '../constants/Colors';

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
        styles.container,
        getPositionStyles(),
        { opacity: fadeAnim }
      ]}
    >
      <View style={styles.content}>
        <View style={styles.indicator} />
        <Text style={styles.timeText}>
          {formatDisplayTime(timeEntity)}
        </Text>
        <Text style={styles.updateText}>
          Updates every {timeService.getUpdateInterval() / 1000}s
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 15,
  },
  content: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: Colors.Orange,
    minWidth: 130,
    alignItems: 'center',
    shadowColor: Colors.Orange,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Orange,
    marginBottom: 4,
    shadowColor: Colors.Orange,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    lineHeight: 17,
    letterSpacing: 0.3,
  },
  updateText: {
    fontSize: 9,
    color: '#888',
    marginTop: 3,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default TimerWidget; 