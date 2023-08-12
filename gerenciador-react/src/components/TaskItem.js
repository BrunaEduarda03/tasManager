const TaskItem = ({ task }) => {
  return (
    <>
      <h2>{task.description}</h2>
      <p>{task.isCompleted}</p>
    </>
  );
};

export default TaskItem;
