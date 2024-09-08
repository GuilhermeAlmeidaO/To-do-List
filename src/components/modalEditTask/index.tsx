import { useState } from "react";
import Alert from "../alert";
import style from "./style.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import AlertErrorForm from "../alertErrorForm";
import { TasksLocalStorageType } from "../../types";
import { updateTask } from "../../handles";
import { msgsErrosForm } from "../kitForm";

interface ModalEditTaskProps {
	buttonIcon: string;
	task: TasksLocalStorageType;
	reloadMainTaskArray: () => void;
}

interface InputFormTypes {
	title: string;
	description: string;
}

export default function ModalEditTask({
	task,
	buttonIcon,
	reloadMainTaskArray,
}: ModalEditTaskProps) {
	const [show, setShow] = useState(false);
	const [messageAlert, setMessageAlert] = useState<string>("");
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [typeAlert, setTypeAlert] = useState<"error" | "success">("success");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<InputFormTypes>({
		mode: "all",
	});

	const handleClose = () => {
		setShow(false);
		reset();
	};

	const handleShow = async () => {
		setShow(true);
		setValue("title", task.title);
		setValue("description", task.description);
	};

	const submitForm = async (data: InputFormTypes) => {
		const newObjTask: TasksLocalStorageType = {
			title: data.title,
			description: data.description,
			createdAt: task.createdAt,
			id: task.id,
			state: task.state,
		};

		await updateTask(newObjTask);
		setMessageAlert("Tarefa foi alterada");
		setTypeAlert("success");
		setOpenAlert(true);
		setTimeout(() => {
			setOpenAlert(false);
		}, 2500);
		reloadMainTaskArray();
		handleClose();
	};

	return (
		<>
			<div onClick={() => handleShow()} className={style.buttonShowModal}>
				<i className={buttonIcon}></i>
			</div>

			<Modal show={show} onHide={handleClose} className={style.modal}>
				<Modal.Header className={style.modalHeader}>
					<Modal.Title className={style.modalTitle}>
						<h2>Edite a tarefa</h2>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className={style.modalBody}>
					<form onSubmit={handleSubmit(submitForm)}>
						<input
							placeholder="Nome da Tarefa"
							className={style.input}
							{...register("title", {
								required: msgsErrosForm.required,
								maxLength: {
									value: 40,
									message: msgsErrosForm.maxLength(40),
								},
								minLength: {
									value: 2,
									message: msgsErrosForm.minLength(2),
								},
							})}
						/>
						{errors.title && (
							<AlertErrorForm>{errors.title.message}</AlertErrorForm>
						)}
						<textarea
							placeholder="Descrição"
							className={style.textarea}
							{...register("description")}
						/>
						{errors.description && (
							<AlertErrorForm>{errors.description.message}</AlertErrorForm>
						)}

						<Button className={style.buttonSave} type="submit">
							Salvar mudanças
						</Button>
					</form>
				</Modal.Body>
				<Modal.Footer className={style.modalFooter}>
					<Button onClick={handleClose} className={style.buttonClose}>
						Fechar
					</Button>
				</Modal.Footer>
			</Modal>
			<Alert message={messageAlert} open={openAlert} type={typeAlert} />
		</>
	);
}
