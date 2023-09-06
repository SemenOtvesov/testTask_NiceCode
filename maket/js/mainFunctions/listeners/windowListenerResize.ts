import { TsetScrollWidth } from "@js/types/stateTypes"

export function windowListenerResize(setScrollWidth: TsetScrollWidth){
    const scrollWidthConst = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    )
    setScrollWidth(scrollWidthConst)
}