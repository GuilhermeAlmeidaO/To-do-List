export function handleThereIsNoLocalStorageItems() {
    const lsString = localStorage.getItem("items")
    if (lsString === null) {
        localStorage.setItem("items", JSON.stringify([]))
    }
}

export function handleClickEnterEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
        return true
    } else {
        return false
    }
}

export function handleReloadPage() {
    window.location.reload()
}

export function handleSameTaskName(name: string): boolean {
    const lsString = localStorage.getItem("items");
    if (lsString !== null) {
        const LSarray = JSON.parse(lsString);
        for (const obj of LSarray) {
            if (obj.task === name) {
                return true; // Retorna true se encontrar um nome correspondente
            }
        }
    }
    return false; // Retorna false se não encontrar nenhum nome correspondente ou se o array estiver vazio
}