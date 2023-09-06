

export function getSelectItemsList(select: HTMLElement): HTMLElement | null{
    return select.querySelector('[data-select-list]')
}