import DisplayTasks from '../../components/displayTasks'
import InputNewTask from '../../components/inputNewTask'
import { handleThereIsNoLocalStorageItems } from '../../handles'
import style from './style.module.scss'
import { useEffect } from 'react'

function Home() {

    useEffect(() => {
        handleThereIsNoLocalStorageItems()
    }, [])

    return (
        <div className={style.container}>
            <main className={style.content}>
                <InputNewTask />
                <DisplayTasks />
            </main>
        </div>
    )
}

export default Home