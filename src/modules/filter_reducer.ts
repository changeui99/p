const SETGENDER = 'SETGENDER' as const
const SETOPENPAGE = 'SETOPENPAGE' as const
const SETRACE = 'SETRACE' as const
const SETETHNICITY = 'SETETHNICITY' as const
const SETDEATH = 'SETDEATH' as const
const SETMIN = 'SETMIN' as const
const SETMAX = 'SETMAX' as const

export const setGender = (s: string) => ({
    type: SETGENDER,
    gender: s
})

export const setOpenPage = (s: string) => ({
    type: SETOPENPAGE,
    open: s
})

export const setRace = (s: string) => ({
    type: SETRACE,
    race: s
})

export const setEthnicity = (s: string) => ({
    type: SETETHNICITY,
    ethnicity: s
})

export const setDeath = (s: string) => ({
    type: SETDEATH,
    death: s
})

export const setMin = (n:number) => ({
    type:SETMIN,
    n:n
})

export const setMax = (n:number) => ({
    type:SETMAX,
    n:n
})

type FilterAction =
    | ReturnType<typeof setGender>
    | ReturnType<typeof setOpenPage>
    | ReturnType<typeof setRace>
    | ReturnType<typeof setEthnicity>
    | ReturnType<typeof setDeath>
    | ReturnType<typeof setMin>
    | ReturnType<typeof setMax>

type FilterState = {
    gender: string,
    open: string,
    race: string,
    ethnicity: string,
    death: string,
    min: number,
    max: number
}

const initialState: FilterState = {
    gender: "",
    open: "",
    race: "",
    ethnicity: "",
    death: "",
    min: -1,
    max: -1
}

function filter(
    state: FilterState = initialState,
    action: FilterAction
): FilterState {
    switch (action.type) {
        case SETGENDER:
            return {
                ...state,
                gender: action.gender
            }
        case SETOPENPAGE:
            return {
                ...state,
                open: action.open
            }
        case SETRACE:
            return {
                ...state,
                race: action.race
            }
        case SETETHNICITY:
            return {
                ...state,
                ethnicity: action.ethnicity
            }
        case SETDEATH:
            return {
                ...state,
                death: action.death
            }
        case SETMIN:
            return {
                ...state,
                min: action.n
            }
        case SETMAX:
            return {
                ...state,
                max: action.n
            }
        default:
            return state
    }
}

export default filter