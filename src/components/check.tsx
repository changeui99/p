import { useState } from 'react'
import { CheckProps } from '../data/models'

function Check(props: CheckProps) {
    const [s_list, setList] = useState<Array<string>>([])
    const [checked_value, setChecked] = useState<string>("")

    function getList() {
        if (props.openPage === props.title) {
            props.setOpen("")
        } else {
            if (props.title === "death") {
                setList(["T", "F"])
                props.setOpen(props.title)
            } else {
                fetch(props.api + "/list").then(res => res.json())
                    .then(res => {
                        setList(res[`${props.title}List`])
                        props.setOpen(props.title)
                    })
            }
        }
    }

    return (
        <div className="check_container" onClick={(event) => {
            getList()
            event.stopPropagation()
        }}>
            <p>{props.title}{props.value === "" ? "" : `: ${props.value}`}</p>
            <div className={props.openPage === props.title ? "c_container" : "c_container_hidden"} onClick={(event) => {
                event.stopPropagation()
            }}>
                {s_list.map((value) => (
                    <div key={value} className="input_container">
                        <input type='radio' id={value} name={props.title} checked={checked_value === value} onChange={(event) => {
                            setChecked(event.target.id)
                        }}/>
                        <label htmlFor={value}>{value}</label>
                    </div>
                ))}
                <div className="b_container">
                    <div className="reset_btn" onClick={(event) => {
                        setChecked("")
                        props.setter("")
                        props.setOpen("")
                    }}>초기화</div>
                    <div className="finish_btn" onClick={(event) => {
                        props.setter(checked_value)
                        props.setOpen("")
                    }}>완료</div>
                </div>
            </div>
        </div>
    )
}

export default Check