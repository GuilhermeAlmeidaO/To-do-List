import { useEffect, useState } from 'react'
import style from './style.module.scss'
import { handleReloadPage } from '../../handles';
// import { handleReloadPage } from '../../handles'

function DisplayTasks() {
    const [LS, setLS] = useState<{ task: string; state: boolean }[]>([])

    useEffect(() => {
        const storedItems = localStorage.getItem("items")
        if (storedItems) {
            setLS(JSON.parse(storedItems))
        }
    }, []);

    function checkTask(task: string) {
        let taskIndex: number | null = null

        for (let i = 0; i < LS.length; i++) {
            if (LS[i].task === task) {
                taskIndex = i
                break
            }
        }

        if (taskIndex !== null){
            LS[taskIndex].state = true
            localStorage.setItem("items", JSON.stringify(LS))
            handleReloadPage()
        }
    }

    function deleteTask(task: string){
        let taskIndex: number | null = null

        for (let i = 0; i < LS.length; i++) {
            if (LS[i].task === task) {
                taskIndex = i
                break
            }
        }

        if (taskIndex !== null){
            LS.splice(taskIndex, 1)
            localStorage.setItem("items", JSON.stringify(LS))
            handleReloadPage()
        }
    }

    return (
        <div className={style.container}>
            <div className={style.toDoContainer}>
                <p className={style.title}>
                    Tarefas a fazer - {LS.filter(task => !task.state).length}
                </p>

                {
                    LS.filter((task) => task.state === false).map((value, index) => (
                        <div className={style.cardTask} key={index}>
                            {value.task}
                            <div className={style.actions}>
                                <i className='fa-solid fa-check' onClick={() => { checkTask(value.task) }} />
                                <i className='fa-solid fa-trash' onClick={() => { deleteTask(value.task) }}/>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className={style.doneContainer}>
                <p className={style.title}>
                    Tarefas feitas - {LS.filter(task => task.state).length}
                </p>

                {
                    LS.filter((task) => task.state === true).map((value, index) => (
                        <div className={style.cardTask} key={index}>
                            <p className={style.title}>{value.task}</p>
                            <div className={style.actions}>
                                <i className='fa-solid fa-trash' onClick={() => { deleteTask(value.task) }}/>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default DisplayTasks
