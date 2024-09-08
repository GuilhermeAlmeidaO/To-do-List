export const msgsErrosForm = {
	required: "Este campo é obrigatório",
	maxLength: (max: number) => {
		return `O máximo de caracteres é ${max}`;
	},
	minLength: (min: number) => {
		return `O mínimo de caracteres é ${min}`;
	}
};