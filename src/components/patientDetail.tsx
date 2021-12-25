import { useState } from 'react'
import { PatientDetaildata } from '../data/models'

function PatientDetail(props: PatientDetaildata) {
    const [conditions, setConditions] = useState<string>("")
    const [visitCount, setVisitCount] = useState<number>(0)

    function getDetail() {
        fetch(props.api + "/api/patient/brief/" + props.patient.personID).then(res => res.json())
            .then((res) => {
                props.setPatient(props.patient.personID)
                var title = ""

                res["conditionList"].map((s:string) => {
                    title += s + "\n"
                })
                setConditions(title)
                setVisitCount(res["visitCount"])
            })
    }

    return (
        <div>
            <div className="p_data_container" onClick={() => {
                if (props.id === props.patient.personID) {
                    props.setPatient(-1)
                } else {
                    getDetail()
                }
            }}>
                <div>
                    <p>{props.patient.personID}</p>
                </div>
                <div>
                    <p>{props.patient.gender}</p>
                </div>
                <div>
                    <p>{props.patient.birthDatetime}</p>
                </div>
                <div>
                    <p>{props.patient.age}</p>
                </div>
                <div>
                    <p>{props.patient.race}</p>
                </div>
                <div>
                    <p>{props.patient.ethnicity}</p>
                </div>
                <div>
                    <p>{props.patient.isDeath ? "T" : "F"}</p>
                </div>
            </div>
            <div className={props.id === props.patient.personID ? "p_detail_container" : "p_detail_container_hidden"}>
                <p className='p_detail_title'>진단 정보 :</p>
                <p className='p_detail_content'>{conditions}</p>
                <p className='p_detail_title'>전체 방문 수 :</p>
                <p className='p_detail_content'>{visitCount}</p>
            </div>
        </div>

    )
}

export default PatientDetail