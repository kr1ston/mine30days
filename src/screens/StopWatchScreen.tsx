import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Alert, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function StopWatchScreen() {
  const navigation = useNavigation();
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [time, setTime] = useState<number>(0);
  const timeRef = useRef<number>(0);
  const [records, setRecords] = useState<number[]>([]);
  const timer = useRef<any>(null);

  const start = () => {
    if (isRunning) {
      Alert.alert('已经在运行了');
    }
    setIsRunning(true);
    setIsPause(false);
    timer.current = setInterval(() => {
      timeRef.current++;
      setTime(timeRef.current);
    }, 10);
  };
  const reset = () => {
    setIsPause(false);
    setRecords([]);
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
      setIsPause(true);
      clearInterval(timer.current);
    }
  };

  const formatTime = (ms: number, key: any = null) => {
    const minutes = Math.floor(ms / 6000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((ms % 6000) / 100)
      .toString()
      .padStart(2, '0');
    const milliSeconds = Math.floor((ms % 6000) % 100)
      .toString()
      .padStart(2, '0');
    if (!key) {
      return `${minutes}:${seconds}.${milliSeconds}`;
    }
    if (key == 'minutes') {
      return `${minutes}`;
    }
    if (key == 'seconds') {
      return `${seconds}`;
    }
    if (key == 'milliSeconds') {
      return milliSeconds;
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.timeWrap}>
          <Text style={styles.time}>{formatTime(time, 'minutes')}</Text>
          <Text style={styles.time}>:</Text>
          <Text style={styles.time}>{formatTime(time, 'seconds')}</Text>
          <Text style={styles.time}>.</Text>
          <Text style={styles.time}>{formatTime(time, 'milliSeconds')}</Text>
        </View>
        <View style={styles.actions}>
          {!isPause && (
            <Button onPress={record} title="分段" disabled={!isRunning} />
          )}
          {isPause && (
            <Button
              onPress={reset}
              title="重置"
              disabled={!time && !records.length}
            />
          )}
          {isRunning ? (
            <Button onPress={pause} title="停止" />
          ) : (
            <Button onPress={start} title="开始" />
          )}
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={records}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.listItem}>
                <Text style={{color: 'white'}}>分段{index + 1}</Text>
                <Text style={styles.itemTime}>{formatTime(item)}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
function Button({
  title = '',
  onPress = () => {},
  disabled = false,
  style = null,
}) {
  console.log(style, 'style');
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#000',
  },
  topContainer: {
    flex: 1,
    position: 'relative',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginTop: 10,
    flex: 1,
    borderTopColor: '#444',
    borderTopWidth: 1,
    overflow: 'scroll',
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btn: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  timeWrap: {
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    flexDirection: 'row',
  },
  time: {
    overflow: 'hidden',
    color: '#fff',
    fontSize: 80,
    fontWeight: '200',
    fontFamily: 'monospace',
  },
  listItem: {
    height: 40,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTime: {
    fontFamily: 'monospace',
    color: '#fff',
  },
});
