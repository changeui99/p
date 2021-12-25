export interface PatientInfo {
    age:number,
    birthDatetime:string,
    ethnicity:string,
    gender:string,
    isDeath:boolean,
    personID:number,
    race:string
}

export interface PatientStats {
    count:number,
    ethnicity:string,
    gender:string,
    race:string
}

export interface ApiProps {
    api:string,
}

export interface CheckProps {
    title:string,
    openPage:string,
    api:string,
    value:string,
    setter:(s:string) => void,
    setOpen:(s:string) => void
}

export interface AgeProps {
    title:string,
    openPage:string,
    minValue:number,
    maxValue:number,
    minsetter:(n:number) => void,
    maxsetter:(n:number) => void,
    setOpen:(s:string) => void
}

export interface PatientDetaildata {
    api:string,
    id:number,
    patient:PatientInfo,
    setPatient:any
}