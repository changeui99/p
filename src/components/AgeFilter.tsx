import { useState } from 'react'
import { AgeProps } from '../data/models'

function AgeFilter(props: AgeProps) {
    const [minage, setMinage] = useState<number>(-1)
    const [maxage, setMaxage] = useState<number>(-1)

    function getList() {
        if (props.openPage === props.title) {
            props.setOpen("")
        } else {
            props.setOpen(props.title)
        }
    }

    function getString() {
        if (props.minValue < 0 && props.maxValue >= 0) {
            return `: ${props.maxValue}세 미만`
        }

        if (props.minValue >= 0 && props.maxValue < 0) {
            return `: ${props.minValue}세 초과`
        }

        if (props.minValue >= 0 && props.maxValue >= 0) {
            return `: ${props.minValue} ~ ${props.maxValue}`
        }

        return ""
    }

    return (
        <div className="check_container" onClick={(event) => {
            getList()
            event.stopPropagation()
        }}>
            <p>{props.title}{getString()}</p>
            <div className={props.openPage === props.title ? "c_container" : "c_container_hidden"} onClick={(event) => {
                event.stopPropagation()
            }}>
                <div className="input_container age_input">
                    <input type="number" id='min' value={minage < 0? "":minage} onChange={(event) => {
                        if (!isNaN(parseInt(event.target.value))) {
                            setMinage(parseInt(event.target.value))
                        } else {
                            setMinage(-1)
                        }
                    }}/>
                    <label htmlFor='min'>세 초과</label>
                </div>
                <div className="input_container age_input">
                    <input type="number" id='max' value={maxage < 0? "":maxage} onChange={(event) => {
                        if (!isNaN(parseInt(event.target.value))) {
                            setMaxage(parseInt(event.target.value))
                        } else {
                            setMaxage(-1)
                        }
                    }}/>
                    <label htmlFor='max'>세 미만</label>
                </div>
                <div className="b_container">
                    <div className="reset_btn" onClick={(event) => {
                        setMinage(-1)
                        setMaxage(-1)
                        props.minsetter(-1)
                        props.maxsetter(-1)
                        props.setOpen("")
                    }}>초기화</div>
                    <div className="finish_btn" onClick={(event) => {
                        props.minsetter(minage)
                        props.maxsetter(maxage)
                        props.setOpen("")
                    }}>완료</div>
                </div>
            </div>
        </div>
    )
}

export default AgeFilter