import { TasksLocalStorageType } from "../types";

export function createLocalStorageItems() {
	const lsString = localStorage.getItem("items");
	if (lsString === null) {
		localStorage.setItem("items", JSON.stringify([]));
	}
}

export async function replaceTask(task: TasksLocalStorageType) {
	const arrayTasks = await getLocalStorage();
	let taskIndexToChange = 0;
	arrayTasks.map((taskMap, index) => {
		if (taskMap.id === task.id) {
			taskIndexToChange = index;
		}
		return taskMap;
	});
	arrayTasks[taskIndexToChange] = task;
	localStorage.setItem("items", JSON.stringify(arrayTasks));
}

export function saveTaskLocalStorage(newTask: TasksLocalStorageType) {
	const ls: TasksLocalStorageType[] = JSON.parse(window.localStorage.getItem("items") as string);
	ls.push(newTask);
	localStorage.setItem("items", JSON.stringify(ls));
}

export function getLocalStorage(): Promise<TasksLocalStorageType[]> {
	return JSON.parse(window.localStorage.getItem("items") as string);
}

export async function markTaskCheck(taskId: number) {
	const arrayTasks = await getLocalStorage();
	const taskToChange = arrayTasks.filter(id => id.id === taskId)[0];
	taskToChange.state = true;
	replaceTask(taskToChange);
}

export async function deleteTask(taskId: number) {
	const arrayTasks = await getLocalStorage();
	let taskIndexToChange = -1;
	arrayTasks.map((taskMap, index) => {
		if (taskMap.id === taskId) {
			taskIndexToChange = index;
		}
		return taskMap;
	});
	if (taskIndexToChange === -1) return;
	arrayTasks.splice(taskIndexToChange, 1);
	localStorage.setItem("items", JSON.stringify(arrayTasks));
}

export async function updateTask(newData: TasksLocalStorageType){
	await replaceTask(newData);
}