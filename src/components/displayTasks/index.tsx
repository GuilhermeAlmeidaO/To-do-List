import style from "./style.module.scss";
import { TasksLocalStorageType } from "../../types";
import { deleteTask, markTaskCheck } from "../../handles";
import ModalEditTask from "../modalEditTask";

interface DisplayTasksProps {
    tasks: TasksLocalStorageType[]
    updateArrayTasks: () => void
}

function DisplayTasks({ tasks, updateArrayTasks }: DisplayTasksProps) {
	const itemsLocalStorage: TasksLocalStorageType[] = tasks;

	return (
		<div className={style.container}>
			<div className={style.toDoContainer}>
				<p className={style.title}>
                    Tarefas a fazer - {itemsLocalStorage.filter(task => !task.state).length}
				</p>

				{
					itemsLocalStorage.filter((task) => task.state === false).map((value, index) => (
						<div className={style.cardTask} key={index}>
							{value.title}
							<div className={style.actions}>
								<ModalEditTask
									buttonIcon='fa-solid fa-pen-to-square'
									task={value}
									reloadMainTaskArray={updateArrayTasks}
								/>
								<i className='fa-solid fa-check' onClick={async () => {
									await markTaskCheck(value.id);
									updateArrayTasks();
								}} />
								<i className='fa-solid fa-trash' onClick={async () => {
									await deleteTask(value.id);
									updateArrayTasks();
								}} />
							</div>
						</div>
					))
				}

			</div>
			<div className={style.doneContainer}>
				<p className={style.title}>
                    Tarefas feitas - {itemsLocalStorage.filter(task => task.state).length}
				</p>

				{
					itemsLocalStorage.filter((task) => task.state === true).map((value, index) => (
						<div className={style.cardTask} key={index}>
							<p className={style.title}>{value.title}</p>
							<div className={style.actions}>
								<i className='fa-solid fa-trash' onClick={async () => {
									await deleteTask(value.id);
									updateArrayTasks();
								}} />
							</div>
						</div>
					))
				}

			</div>
		</div>
	);
}

export default DisplayTasks;
