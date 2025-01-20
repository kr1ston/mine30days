import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

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
    setTime(0);
  };
  const record = () => {
    const _list = [...records, time];
    setRecords(_list);
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60);
    const seconds = Math.floor(ms % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
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
          <Button onPress={start} title="开始" />
          <Button onPress={record} title="计次" />
          <Button onPress={reset} title="重置" />
        </View>
        <View style={styles.list}>
          {records.map((item, index) => {
            return (
              <View key={index}>
                <Text>{formatTime(item)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  time: {},
  actions: {},
  btn: {},
  start: {},
  list: {},
});
