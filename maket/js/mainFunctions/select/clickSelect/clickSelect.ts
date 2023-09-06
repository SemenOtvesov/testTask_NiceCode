import { getSelectItems } from "../getSelectItems/getSelectItems"


export function clickSelect(selects: NodeListOf<HTMLElement>, event: any){
    selects.forEach(select=>{
        const selectButton: any = select.children[0]
        const selectItems: any = getSelectItems(select)

        if(select == event.target.closest('#select')){
            if(event.target.closest('#select')){
                select.classList.toggle('active')
        
                const selectItem = event.target.closest('#selectItem')
                if(selectItem){
                    selectItems.forEach((el: HTMLElement)=>el.classList.remove('selected'))
                    selectItem.classList.add('selected')

                    if(!select.dataset.fallInner){
                        selectButton.innerHTML = selectItem.getAttribute('value')
                    }
                }
            }
        }
    })
}