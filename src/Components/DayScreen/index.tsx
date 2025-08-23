import React, { useState, useRef } from "react";
import { FlatList, SafeAreaView, Text, ListRenderItem, View, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import DutyCard from "../DutyCard";
import AddModal from "../AddModal";
import EditModal from "../EditModal";
import styles from "./styles";
import {  TodoRemove, TodoHide } from "../../Redux/Todo/TodoSlice";
import { Swipeable } from "react-native-gesture-handler";
import { TodoItem } from '../../Redux/types/todo'

interface DayScreenProps {
  dayKey: string;
  dayTitle: string;
}

export default function DayScreen({ dayKey, dayTitle }: DayScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTask, setEditTask] = useState<TodoItem | null>(null);

  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.todo.todos);
  const hiddenTaskIds = useSelector((state: any) => state.todo.hiddenTaskIds);

  // Gizlenenleri filtrele
  const filteredTasks = tasks
    .filter((todo: TodoItem) => todo.dayKey === dayKey)
    .filter((todo: TodoItem) => !hiddenTaskIds.includes(todo.id));

  const handleDelete = (id: string) => {
    dispatch(TodoRemove(id));
  };

  const handleEdit = (task: TodoItem) => {
    setEditTask(task);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setEditTask(null);
  };

  const handleSwipeRight = (id: string) => {
    dispatch(TodoHide(id));
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    itemId: string
  ) => {
    return (
      <View
        style={{
          backgroundColor: "#efeefc",
          justifyContent: "center",
          flex: 1,
          borderRadius: 16,
          marginBottom: 10,
          alignItems: "flex-end",
          paddingRight: 20,
        }}
      >
        <Text style={{ color: "#000", fontWeight: "600" }}>Tamamlandı</Text>
      </View>
    );
  };

  const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item.id)
      }
      onSwipeableRightOpen={() => handleSwipeRight(item.id)}
    >
      <DutyCard
        type="weeks"
        task={item}
        isActive={activeCardId === item.id}
        onPress={() => setActiveCardId(activeCardId === item.id ? null : item.id)}
        onDelete={() => handleDelete(item.id)}
        onUpdate={() => handleEdit(item)}
      />
    </Swipeable>
  );

  return (
    <>
      <Header title={dayTitle} onAddPress={() => setModalVisible(true)} />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>Henüz görev yok.</Text>}
        />

        <AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} dayKey={dayKey} />

        <EditModal
          modalVisible={editModalVisible}
          setModalVisible={handleCloseEditModal}
          dayKey={dayKey}
          task={editTask}
        />
      </SafeAreaView>
    </>
  );
}
