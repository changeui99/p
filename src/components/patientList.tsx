import { useState, useEffect } from "react"
import { PatientInfo, ApiProps } from "../data/models"

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/rootReducer';
import { setDeath, setEthnicity, setGender, setMin, setMax, setOpenPage, setRace } from '../modules/filter_reducer';
import Check from "./check";
import AgeFilter from "./AgeFilter";
import PatientDetail from "./patientDetail";

function PatientList(props: ApiProps) {
    const f_gender = useSelector((state: RootState) => state.filter.gender)
    const f_race = useSelector((state: RootState) => state.filter.race)
    const f_ethnicity = useSelector((state: RootState) => state.filter.ethnicity)
    const f_death = useSelector((state: RootState) => state.filter.death)
    const f_min = useSelector((state: RootState) => state.filter.min)
    const f_max = useSelector((state: RootState) => state.filter.max)
    const openPage = useSelector((state: RootState) => state.filter.open)
    const dispatch = useDispatch()

    const f_setGender = (s: string) => {
        dispatch(setGender(s))
    }

    const f_setRace = (s: string) => {
        dispatch(setRace(s))
    }

    const f_setEthnicity = (s: string) => {
        dispatch(setEthnicity(s))
    }

    const f_setDeath = (s: string) => {
        dispatch(setDeath(s))
    }

    const f_setOpenPage = (s: string) => {
        dispatch(setOpenPage(s))
    }

    const f_setmin = (n: number) => {
        dispatch(setMin(n))
    }

    const f_setmax = (n: number) => {
        dispatch(setMax(n))
    }

    const [p_list, setpList] = useState<Array<PatientInfo>>([]);
    const [total, settotal] = useState<number>(0)
    const [page, setpage] = useState<number>(1)
    const [p_length, setpLength] = useState<number>(10);
    const [length_page, setlength_page] = useState<boolean>(false)
    const [order_column, setOrder] = useState<string>("")
    const [order_desc, setOrderDesc] = useState<boolean>(true)
    const [patientID, setPatientID] = useState<number>(-1)

    useEffect(() => {
        reload()
    }, [page, p_length, order_column, order_desc, f_gender, f_race, f_ethnicity, f_min, f_max, f_death]);

    window.addEventListener('click', (event) => {
        setlength_page(false)
        f_setOpenPage("")
    }, false)


    function reload() {
        var url = `${props.api}/api/patient/list?page=${page}&length=${p_length}`
        var order = order_column
        var desc = order_desc

        if (order !== "") {
            if (order === "age") {
                order = "birth"
                desc = !desc
            }
            url += `&order_column=${order}&order_desc=${desc}`
        }

        if (f_gender !== "") {
            url += `&gender=${f_gender}`
        }

        if (f_race !== "") {
            url += `&race=${f_race}`
        }

        if (f_ethnicity !== "") {
            url += `&ethnicity=${f_ethnicity}`
        }

        if (f_min >= 0) {
            url += `&age_min=${f_min}`
        }

        if (f_max >= 0) {
            url += `&age_max=${f_max}`
        }

        if (f_death !== "") {
            url += `&death=${f_death === "T" ? "true" : "false"}`
        }

        fetch(url).then(res => res.json())
            .then(res => {
                setPatientID(-1)
                setpList(res["patient"]["list"])
                settotal(res["patient"]["totalLength"])
            });
    }

    function OrderChange(s: string) {
        if (s === order_column && order_desc) {
            setOrderDesc(false)
        } else if (s === order_column && !order_desc) {
            setOrder("")
        } else {
            setOrder(s)
            setOrderDesc(true)
        }

    }

    return (
        <div className="p_container">
            <div className="p_filter_container">
                <Check title="gender" api={`${props.api}/api/gender`} value={f_gender} openPage={openPage} setter={f_setGender} setOpen={f_setOpenPage} />
                <Check title="race" api={`${props.api}/api/race`} value={f_race} openPage={openPage} setter={f_setRace} setOpen={f_setOpenPage} />
                <Check title="ethnicity" api={`${props.api}/api/ethnicity`} value={f_ethnicity} openPage={openPage} setter={f_setEthnicity} setOpen={f_setOpenPage} />
                <AgeFilter title="age" minValue={f_min} maxValue={f_max} openPage={openPage} minsetter={f_setmin} maxsetter={f_setmax} setOpen={f_setOpenPage} />
                <Check title="death" api={""} value={f_death} openPage={openPage} setter={f_setDeath} setOpen={f_setOpenPage} />
                <div className="row_selector_container">
                    <div className="page_length" onClick={(event) => {
                        setlength_page(true)
                        event.stopPropagation()
                    }}>
                        <p>{p_length}</p>
                        <div className={`page_length_container ${length_page ? 'page_length_container_open' : ""}`}>
                            <p className={`${p_length === 10 ? 'selected' : 'not_selected'}`} onClick={(event) => {
                                setpage(Math.min(Math.round(((page - 1) * p_length) / 10) + 1, Math.floor(total / 10)))
                                setpLength(10)
                                setlength_page(false)
                                event.stopPropagation()
                            }}>10</p>
                            <p className={`${p_length === 30 ? 'selected' : 'not_selected'}`} onClick={(event) => {
                                setpage(Math.min(Math.round(((page - 1) * p_length) / 30) + 1, Math.floor(total / 30)))
                                setpLength(30)
                                setlength_page(false)
                                event.stopPropagation()
                            }}>30</p>
                            <p className={`${p_length === 50 ? 'selected' : 'not_selected'}`} onClick={(event) => {
                                setpage(Math.min(Math.round(((page - 1) * p_length) / 50) + 1, Math.floor(total / 50)))
                                setpLength(50)
                                setlength_page(false)
                                event.stopPropagation()
                            }}>50</p>
                        </div>
                    </div>
                    <p>페이지당 행 수:</p>
                </div>
            </div>
            <div className="p_title_container">
                <div className={order_column === "person_id" ? 'bold_title' : 'order_disalbe'} onClick={() => OrderChange("person_id")}>
                    <p>환자 ID</p>
                    <span className={order_desc ? "order_desc" : "order_asc"}></span>
                </div>
                <div className={order_column === "gender" ? 'bold_title' : 'order_disalbe'} onClick={() => OrderChange("gender")}>
                    <p>성별</p>
                    <span className={order_desc ? "order_desc" : "order_asc"}></span>
                </div>
                <div className={order_column === "birth" ? 'bold_title' : 'order_disalbe'} onClick={() => OrderChange("birth")}>
                    <p>생년월일</p>
                    <span className={order_desc ? "order_desc" : "order_asc"}></span>
                </div>
                <div className={order_column === "age" ? 'bold_title' : 'order_disalbe'} onClick={() => OrderChange("age")}>
                    <p>나이</p>
                    <span className={order_desc ? "order_desc" : "order_asc"}></span>
                </div>
                <div className={order_column === "race" ? 'bold_title' : 'order_disalbe'} onClick={() => OrderChange("race")}>
                    <p>인종</p>
                    <span className={order_desc ? "order_desc" : "order_asc"}></span>
                </div>
                <div className={order_column === "ethnicity" ? 'bold_title' : 'order_disalbe'} onClick={() => OrderChange("ethnicity")}>
                    <p>민족</p>
                    <span className={order_desc ? "order_desc" : "order_asc"}></span>
                </div>
                <div className={order_column === "death" ? 'bold_title' : 'order_disalbe'} onClick={() => OrderChange("death")}>
                    <p>사망 여부</p>
                    <span className={order_desc ? "order_desc" : "order_asc"}></span>
                </div>
            </div>
            {p_list.map((patient) => (
                <PatientDetail key={patient.personID} api={props.api} id={patientID} patient={patient} setPatient={setPatientID}/>
            ))}
            <div className="p_page_container">
                <span className={page === 1 ? 'left_arr_disable' : 'left_arr'} onClick={() => {
                    if (page !== 1) {
                        setpage(page - 1)
                    }
                }}></span>
                <p>{total}개 중 {(page - 1) * p_length + 1}~{Math.min(page * p_length, total)}</p>
                <span className={page * p_length >= total ? 'right_arr_disable' : 'right_arr'} onClick={() => {
                    if (page * p_length < total) {
                        setpage(page + 1)
                    }
                }}></span>
            </div>
        </div>
    )
}

export default PatientList