import style from "./style.module.scss";
import DisplayTasks from "../../components/displayTasks";
import { createLocalStorageItems, getLocalStorage } from "../../handles";
import { useEffect, useState } from "react";
import CreateNewTask from "../../components/createNewTask";
import { TasksLocalStorageType } from "../../types";

function Home() {
	const [tasksLocalStorage, setTasksLocalStorage] = useState<TasksLocalStorageType[]>([]);

	const getTasks = async () => {
		const tasks = await getLocalStorage();
		setTasksLocalStorage(tasks);
	};

	useEffect(() => {
		createLocalStorageItems();
		getTasks();
	}, []);

	return (
		<div className={style.container}>
			<main className={style.content}>
				<CreateNewTask
					buttonMessage='Crie uma nova tarefa'
					updateArrayTasks={() => getTasks()}
				/>
				<DisplayTasks
					tasks={tasksLocalStorage}
					updateArrayTasks={() => getTasks()}
				/>
			</main>
		</div>
	);
}

export default Home;