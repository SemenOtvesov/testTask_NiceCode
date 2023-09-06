import { clickSelect } from "./clickSelect/clickSelect"
import { getSelectItemsList } from "./getSelectItemsList/getSelectItemsList"


type TbuttonSelected = undefined | (()=>void)
export function buttonSelected(selects: NodeListOf<HTMLElement>): TbuttonSelected{
    if(!selects[0]){return}
    selects.forEach(select=>{
        const selectButton: any = select.children[0]
        const selectItemsList: any = getSelectItemsList(select)
        const selectItems: any = getSelectItems(select)
    
        if(selectItemsList !== null && selectItems[0]){
            const initSelectValue: string = selectItemsList.querySelector('.selected')?.getAttribute('value')
            if(initSelectValue){selectButton.innerHTML = initSelectValue}else{
                selectItems[0].classList.add('selected')
                selectButton.innerHTML = selectItems[0].getAttribute('value')
            }
        }
    })

    let clickSelectBind = clickSelect.bind(event, selects);
    document.addEventListener('click', clickSelectBind)

    return ()=>{
        document.removeEventListener('click', clickSelectBind)
    }
}

function getSelectItems(select: HTMLElement){
    if(select.dataset.fixsed){
        if(select.dataset.selectType === "addExercisePopapInput"){
            return document.getElementById('addExercisePopapInputList')?.querySelectorAll('#selectItem')
        }
    }else{
        return select.querySelectorAll('#selectItem')
    }
}