import { useId } from "react";
import style from "./style.module.scss";

interface AlertPros {
    message: string,
    type: "error" | "success",
    title?: string,
    open: boolean,
}

export default function Alert({ message, type, title, open }: AlertPros) {
	const alertId = useId();

	const styleProps = {
		backgroundColor: type === "error" ? "red" : "green",
	};

	const alertComponent = document.getElementById(alertId);
	if (alertComponent !== null) {
		if (open) {
			alertComponent.classList.add(style.open);
			alertComponent.classList.add(style.animationBar);
		} else {
			alertComponent.classList.remove(style.open);
			alertComponent.classList.remove(style.animationBar);
		}
	}

	return (
		<>
			<div className={style.container} style={styleProps} id={alertId}>
				<h1 className={style.title}>{title}</h1>
				<p className={style.message}>{message}</p>
			</div>
		</>
	);
}