import { useState, useEffect } from 'react'
import style from './style.module.scss'
import { handleClickEnterEvent, handleReloadPage, handleSameTaskName } from '../../handles'

function InputNewTask() {

    useEffect(() => {
        const input = document.getElementById("input")
        if (input !== null){
            input.focus()
        }
    }, [])

    const [valueInput, setValueInput] = useState("")

    function createTask() {
        if (valueInput !== "") {
            const sameTaskName = handleSameTaskName(valueInput)
            if (!sameTaskName) {
                const itemsLS = localStorage.getItem("items")
                if (itemsLS) {
                    const newTaskToLS = {
                        task: valueInput,
                        state: false
                    }
                    const newItemsLS = [...JSON.parse(itemsLS), newTaskToLS]
                    localStorage.setItem("items", JSON.stringify(newItemsLS))
                    setValueInput("")
                    handleReloadPage()
                }
            }
        }
    }

    return (
        <div className={style.container}>
            <input
                type='text'
                placeholder='Crie uma nova tarefa'
                id='input'
                onChange={(e) => { setValueInput(e.target.value) }}
                value={valueInput}
                className={style.input}
                // eslint-disable-next-line
                onKeyDown={(e) => { handleClickEnterEvent(e) === true ? createTask() : null }}
                autoComplete="off"
            />

            <button
                className={style.submit}
                id='submit'
                onClick={createTask}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}

export default InputNewTask