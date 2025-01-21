import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Button, Alert, FlatList} from 'react-native';

export default function StopWatchScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(0);
  const timeRef = useRef<number>(0);
  const [records, setRecords] = useState<number[]>([]);
  const timer = useRef<any>(null);

  const start = () => {
    if (isRunning) {
      Alert.alert('已经在运行了');
    }
    setIsRunning(true);
    timer.current = setInterval(() => {
      timeRef.current++;
      setTime(timeRef.current);
    }, 10);
  };
  const reset = () => {
    if (isRunning) {
      setIsRunning(false);
      setRecords([]);
    }
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    setIsRunning(false);
    timeRef.current = 0;
    setTime(0);
  };
  const record = () => {
    const _list = [...records, time];
    setRecords(_list);
  };
  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timer.current);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 6000);
    const seconds = Math.floor((ms % 6000) / 100);
    const milliSeconds = Math.floor((ms % 6000) % 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliSeconds.toString().padStart(2, '0')}`;
  };
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text>{formatTime(time)}</Text>
      </View>
      <View style={styles.actions}>
        <View>
          <Button onPress={start} title="开始" disabled={isRunning} />
          <Button onPress={record} title="计次" disabled={!isRunning} />
          <Button onPress={pause} title="暂停" disabled={!isRunning} />
          <Button
            onPress={reset}
            title="重置"
            disabled={!time && !records.length}
          />
        </View>
        <View style={styles.list}>
          <FlatList
            data={records}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => {
              return <Text>{formatTime(item)}</Text>;
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  time: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  timeText: {
    fontSize: 60,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
  },
  actions: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recordText: {
    fontSize: 16,
    color: '#333',
  },
});
