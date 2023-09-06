export type TuserList = Array<Tuser>
export type Tuser = {
    uid: string
    namePreview: string,
    name: string,
    checkMark: '' | 'tme' | 'warn',
    age: number,
    gender: 'муж' | 'жен'
    notes: Array<Tnote>,
    consult: Array<Tconsult>,
    video: Array<Tvideo>,
    events: Array<Tevent>
}
export type TrightActive = 'Notes' | 'Consultations' | 'Video' | 'Events'

type Tnote = {
    date: string,
    text: string
}

type Tconsult = {
    type: 'online' | 'consult',
    time: string
}

type Tvideo = {
    previewName: string,
    title: string,
    text: string,
    time? :string
}

type Tevent = {
    previewName: string,
    title: string,
    eventName: string,
    date: string,
    time: string
}