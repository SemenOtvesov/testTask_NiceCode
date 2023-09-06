import { TrightActive, Tuser } from "./mainTypes"

export type TsetActiveUser = (a:Tuser)=>void
export type TsetRightActive = (a: TrightActive)=>void
export type TsetScrollWidth = (a: number)=> void