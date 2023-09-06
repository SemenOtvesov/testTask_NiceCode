import { TsetActiveUser, TsetRightActive } from "@js/types/stateTypes"
import { userList } from "@js/localBD/userList"

type props = {
    setActiveUser: TsetActiveUser,
    setRightActive: TsetRightActive
}

export default ({setActiveUser, setRightActive}: props,event:MouseEvent)=>{
    const target: any = event.target

    let scrollWidth = Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth,
    document.body.offsetWidth, document.documentElement.offsetWidth,
    document.body.clientWidth, document.documentElement.clientWidth
    );

    if(target.closest('#userButton')){
        const userButton:HTMLElement = target.closest('#userButton')
        const userButtons: NodeListOf<HTMLElement> = document.querySelectorAll('#userButton')

        userButtons.forEach((userButt:HTMLElement)=>{
            if(!(userButton.dataset.uid && userButt.dataset.uid)){return}
            if(+userButton.dataset.uid === +userButt.dataset.uid){
                userList.forEach(user=>{
                    if(user.uid === userButt.dataset.uid){
                        setActiveUser(user)
                    }
                })
            }
        })

        if(scrollWidth < 769){
            document.getElementById('right')?.classList.add('active')
            document.getElementById('left')?.classList.remove('active')
        }
    }

    if(target.closest('#userClose')){
        document.getElementById('right')?.classList.remove('active')
        document.getElementById('left')?.classList.add('active')
    }

    if(target.closest('#navButton')){
        const navButton:HTMLElement = target.closest('#navButton')
        const rightActive = navButton.dataset.nav

        if((rightActive === 'Notes') || (rightActive === 'Consultations') || (rightActive === 'Video') || (rightActive === 'Events')){
            setRightActive(rightActive)
        }
    }
}