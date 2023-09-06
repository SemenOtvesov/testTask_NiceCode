import React, { useEffect, useState } from "react";
import { userList } from "@js/localBD/userList";

import userListItem from "@middleComponents/userListItem";
import { TrightActive, Tuser } from "@js/types/mainTypes";

import { buttonSelected } from "@mainFunctions/select/select";
import { equalSidesFn } from "@mainFunctions/equalSidesFn/equalSidesFn";
import windowListenerClick from "@mainFunctions/listeners/windowListenerClick";
import { windowListenerResize } from "@mainFunctions/listeners/windowListenerResize";

const imgIconPath:string = './img/icon/'


export default ()=>{
    const [activeUser, setActiveUser] = useState<Tuser>(userList[0])
    const [rightActive, setRightActive] = useState<TrightActive>('Notes')
    const [scrollWdth, setScrollWidth] = useState(Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth,
    document.body.offsetWidth, document.documentElement.offsetWidth,
    document.body.clientWidth, document.documentElement.clientWidth
    ))

    useEffect(()=>{
        equalSidesFn()

        const userButtons: NodeListOf<HTMLElement> = document.querySelectorAll('#userButton')
        userButtons.forEach(user=>{
            if(user.dataset.uid === activeUser.uid){
                user.classList.add('active')
            }else{
                user.classList.remove('active')
            }
        })

        const selects: NodeListOf<HTMLElement> = document.querySelectorAll('#select')
        return buttonSelected(selects)
    })

    useEffect(()=>{
        const navButons: NodeListOf<HTMLElement> = document.querySelectorAll('#navButton')
        navButons.forEach(el=>{
            if(el.dataset.nav === rightActive){
                el.classList.add('active')
            }else{el.classList.remove('active')}
        })
    }, [rightActive])

    useEffect(()=>{
        setRightActive('Notes')
    }, [activeUser])

    useEffect(()=>{
        const clickFn = windowListenerClick.bind(this, {setActiveUser, setRightActive})
        const resizeFn = windowListenerResize.bind(this, setScrollWidth)

        document.addEventListener('click', clickFn)
        document.addEventListener('resize', resizeFn)
        return ()=>{
            document.removeEventListener('click', clickFn)
            document.removeEventListener('click', resizeFn)
        }
    }, [])

    return <main className="main__container"> 
        <div id="left" className="main__left active">

            <div className="main__search-box whiteBox">

                <div className="main__search-input-box">
                    <div className="main__search-button">
                        <picture className='main__search-button-icon search icon-search'></picture>
                    </div>
    
                    <input className="main__search-input"/>
                </div>

                <div className="main__search-button none">
                    <picture className='main__search-button-icon filter icon-filter'></picture>
                </div>

                <div className="main__search-button close">
                    <picture className='main__search-button-icon icon-plus'></picture>
                </div>

            </div>

            <div className="main__quantity-box">
                <div className="main__quantity">{userList.length}</div>
                <div className="main__quantity-text">Выбрать</div>
            </div>

            <ul className="main__user-list">
                {userList.map(user=>userListItem(user, imgIconPath))}
            </ul>
        </div>

        <div id="right" className="main__right">
            <div className="main__account-box whiteBox">
                <picture className="main__account-preview">
                    <source srcSet={`./img/userLogo/${activeUser.namePreview}.webp`}/>
                    <img src={`./img/userLogo/${activeUser.namePreview}.png`} alt="" />
                </picture>

                <div className="main__account-text-box">
                    <div className="main__account-text big">{activeUser.name}</div>
                    <div className="main__account-text">{activeUser.age}{numberText(activeUser.age)}, {activeUser.gender}</div>
                </div>

                <div id="select" data-fall-inner className="more">
                    <button className="more-button icon-more"></button>
                    <ul className="more-list whiteBox">
                        <li id="selectItem" value={'Изменить'} className="more-item selected ">Изменить</li>
                        <li id="selectItem" value={'Удалить'} className="more-item ">Удалить</li>
                    </ul>
                </div>
                <div id="userClose" className="main__account-close"></div>
            </div>

            <nav className="main__nav-box">
                <div className="main__nav-left">
                    <div id="navButton" data-nav='Notes' className="main__nav">Заметки</div>
                    <div id="navButton" data-nav='Consultations' className="main__nav">Консультации</div>
                    <div id="navButton" data-nav='Video' className="main__nav">Видео</div>
                    <div id="navButton" data-nav='Events' className="main__nav">Мероприятия</div>
                </div>
                <div className="main__nav-right">
                    <div className="main__nav-text">Новая заметка</div>
                    <div className="main__nav-button">
                        <picture className='main__search-button-icon icon-plus rotate'>
                        </picture>
                    </div>
                </div>
            </nav>

            <div className="main__right-content whiteBox">
                {rightContent(rightActive, activeUser)}
            </div>
        </div>
    </main>
}

function rightContent(rightActive: TrightActive, activeUser: Tuser){

    if(rightActive === 'Notes'){
        return <>
            {activeUser.notes.map(note=>{
                return <div key={Math.random()} className="main__right-content-note">
        
                    <div className="main__right-content-note-text-box">
                        <span className="main__right-content-note-title">{note.date}</span>
                        <span className="main__right-content-note-text">{note.text}</span>
                    </div>
                    <div id="select" data-fall-inner className="more">
                        <button className="more-button icon-more"></button>
                        <ul className="more-list whiteBox">
                            <li id="selectItem" value={'Изменить'} className="more-item selected ">Изменить</li>
                            <li id="selectItem" value={'Удалить'} className="more-item ">Удалить</li>
                        </ul>
                    </div>
            
                </div>
            })}
        
            <div id="aspectSidesRev" data-aspect='0.69' className="main__right-content-map">
                <picture>
                    <source srcSet=''/>
                    <img src='./img/mapBack.png' alt='' />
                </picture>
            </div>
        </>
    }
    if(rightActive === 'Consultations'){
        return activeUser.consult.map(consultation=>{
            if(consultation.type === 'consult'){
                return(
                    <div key={Math.random()} className="main__right-content-consult">
                        <div className='main__right-content-consult-preview consult'><div className="icon-consult"/></div>
                        <div className="main__right-content-consult-text-box">
                            <div className="main__right-content-consult-title">Личный приём</div>
                            <div className="main__right-content-consult-text">{consultation.time}</div>
                        </div>
                        <div className="main__right-content-consult-state red">Не подтверждена</div>
                    </div>
                )
            }
            if(consultation.type === 'online'){
                return(
                    <div key={Math.random()} className="main__right-content-consult">
                        <div className='main__right-content-consult-preview'><div className="icon-video"/></div>
                        <div className="main__right-content-consult-text-box">
                            <div className="main__right-content-consult-title">Online консультация</div>
                            <div className="main__right-content-consult-text">{consultation.time}</div>
                        </div>
                        <div className="main__right-content-consult-state"></div>
                    </div>
                )
            }
            return <></>
        })
    }
    if(rightActive === 'Video'){
        return activeUser.video.map(vid=>{
            return(
                <div key={Math.random()} className="main__right-content-consult">
                    <picture id="aspectSides" data-aspect='1.78' className='main__right-content-video-preview'>
                        <source srcSet={`./img/videoPreview/${vid.previewName}.webp`}/>
                        <img src={`./img/videoPreview/${vid.previewName}.png`} alt="" />
                    </picture>
                    <div className="main__right-content-consult-text-box">
                        <div className="main__right-content-consult-title">{vid.title}</div>
                        <div className="main__right-content-consult-text">{vid.text}</div>
                    </div>
                    <div className="main__right-content-consult-state gray">{vid.time}</div>
                </div>
            )
        })
    }
    if(rightActive === 'Events'){
        return activeUser.events.map(event=>{
            return(
                <div key={Math.random()} className="main__right-content-consult">
                    <picture id="aspectSides" data-aspect='1.78' className='main__right-content-video-preview'>
                        <source srcSet={`./img/eventsPreview/${event.previewName}.webp`}/>
                        <img src={`./img/eventsPreview/${event.previewName}.png`} alt="" />
                    </picture>
                    <div className="main__right-content-consult-text-box">
                        <div className="main__right-content-consult-title">{event.title}</div>
                        
                        <div className="main__right-content-event-param-box">

                            <div className="main__right-content-event-param">
                                <picture>
                                    <source srcSet={`${imgIconPath}/video/video.png`} />
                                    <img src={`${imgIconPath}/video/video.png`} alt='' />
                                </picture>
                                <div className="main__right-content-event-param-text">{event.eventName}</div>
                            </div>

                            <div className="main__right-content-event-param">
                                <picture>
                                    <source srcSet={`${imgIconPath}/calendar/calendar.png`} />
                                    <img src={`${imgIconPath}/calendar/calendar.png`} alt='' />
                                </picture>
                                <div className="main__right-content-event-param-text">{event.date}</div>
                            </div>

                            <div className="main__right-content-event-param">
                                <picture>
                                    <source srcSet={`${imgIconPath}/clock/clock.png`} />
                                    <img src={`${imgIconPath}/clock/clock.png`} alt='' />
                                </picture>
                                <div className="main__right-content-event-param-text">{event.time}</div>
                            </div>

                        </div>

                    </div>
                </div>
            )
        })
    }
}

function numberText(num: number){
   let text = '';
   if([1].includes(num)){text = ' год'}
   if([2,3,4].includes(num)){text = ' года'}
   if([5,6,7,8,9,0].includes(num)){text = ' лет'}
   return text
}