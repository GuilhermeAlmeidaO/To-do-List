import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import style from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import AlertErrorForm from "../alertErrorForm";
import Alert from "../alert";
import { saveTaskLocalStorage } from "../../handles";
import { msgsErrosForm } from "../kitForm";

interface ModalCreateTaskProps {
    buttonMessage: string
    updateArrayTasks: () => void
}

interface InputFormTypes {
    title: string,
    description: string,
}

export default function CreateNewTask({ buttonMessage, updateArrayTasks }: ModalCreateTaskProps) {
	const [show, setShow] = useState(false);
	const [messageAlert, setMessageAlert] = useState<string>("");
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [typeAlert, setTypeAlert] = useState<"error" | "success">("success");

	const { register, handleSubmit, formState: { errors }, reset } = useForm<InputFormTypes>({
		mode: "all",
		defaultValues: {
			description: "",
			title: "",
		}
	});

	const handleClose = () => {
		setShow(false);
		reset();
	};
	const handleShow = () => setShow(true);

	const submitForm = (data: InputFormTypes) => {
		const dateInstace = new Date();
		const date = `${dateInstace.getFullYear()}-${dateInstace.getMonth().toString().padStart(2, "0")}-${dateInstace.getDay().toString().padStart(2, "0")}`;
		const objTask = {
			...data,
			createdAt: date,
			state: false,
			id: dateInstace.getTime()
		};
		saveTaskLocalStorage(objTask);
		updateArrayTasks();
		setMessageAlert("Tarefa criada com sucesso!");
		setTypeAlert("success");
		setOpenAlert(true);
		setTimeout(() => {
			setOpenAlert(false);
		}, 2500);
		handleClose();
	};

	return (
		<>
			<button
				onClick={() => handleShow()}
				className={style.buttonShowModal}
			>
				{buttonMessage}
			</button>

			<Modal
				show={show}
				onHide={handleClose}
				className={style.modal}
			>
				<Modal.Header
					className={style.modalHeader}
				>
					<Modal.Title className={style.modalTitle}>
						<h2>Crie uma nova tarefa</h2>
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
									message: msgsErrosForm.maxLength(40)
								},
								minLength: {
									value: 2,
									message: msgsErrosForm.minLength(2)
								}
							})}
						/>
						{
							errors.title && <AlertErrorForm>{errors.title.message}</AlertErrorForm>
						}
						<textarea
							placeholder="Descrição"
							className={style.textarea}
							{...register("description")}
						/>
						{
							errors.description && <AlertErrorForm>{errors.description.message}</AlertErrorForm>
						}

						<Button
							className={style.buttonSave}
							type="submit"
						>
                            Criar tarefa
						</Button>
					</form>
				</Modal.Body>
				<Modal.Footer className={style.modalFooter}>
					<Button
						onClick={handleClose}
						className={style.buttonClose}
					>
                        Fechar
					</Button>
				</Modal.Footer>
			</Modal>
			<Alert
				message={messageAlert}
				open={openAlert}
				type={typeAlert}
			/>
		</>
	);
}