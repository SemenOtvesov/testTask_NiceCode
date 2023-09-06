import { test, describe, expect } from "@jest/globals";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import { buttonSelected } from "../select";
import userEvent  from "@testing-library/user-event";
import '@testing-library/jest-dom'

describe('clickSelectTest', ()=>{
    let removeListener: ()=>void = ()=>{}
    let div: HTMLDivElement

    beforeEach(()=>{
        const El = ()=>(<>
            <div id="select">
                <button></button>
                <ul data-select-list>
                    <li id="selectItem" value={'value'}>value</li>
                    <li id="selectItem" value={'value2'}>value2</li>
                </ul>
            </div>
            <div id="select" >
                <button></button>
                <ul data-select-list>
                    <li id="selectItem" value={'value'}>value</li>
                    <li id="selectItem" value={'value2'}>value2</li>
                </ul>
            </div>
            </>)
        div = document.createElement('div');
        const root = createRoot(div);
        flushSync(() => {root.render(<El />);});

        const queryEl:NodeListOf<HTMLElement> = div.querySelectorAll('#select')
        buttonSelected(queryEl)
    })

    test('initActiveItem', ()=>{
        const queryEl:NodeListOf<HTMLElement> = div.querySelectorAll('#select')
        queryEl.forEach(select=>{
            const selectItem: HTMLLIElement | null = select.querySelector('#selectItem')
            const selectButton: HTMLButtonElement | null = select.querySelector('button')

            if(!selectItem){return}
            expect(selectItem.className).toMatch(/selected/i)

            if(!selectButton){return}
            expect(selectButton.innerHTML).toBe(selectItem.innerHTML)
        })
    })

    test('clickFirstItem', ()=>{
        const queryEl:NodeListOf<HTMLElement> = div.querySelectorAll('#select')

        for(const key of queryEl){
            const button = key.querySelector('button')
            const firstItem = key.querySelectorAll('#selectItem')[0];
            userEvent.click(firstItem)

            if(!button){return}
            expect(button.innerHTML).toBe(firstItem.innerHTML)
            expect(firstItem.className).toMatch(/selected/i)
        }
    })

    test('clickSecondItem', ()=>{
        const queryEl:NodeListOf<HTMLElement> = div.querySelectorAll('#select')

        for(const key of queryEl){
            const fn = async ()=>{
                await userEvent.click(key)
                const button = key.querySelector('button')
                const firstItem = key.querySelectorAll('#selectItem')[1];
                await userEvent.click(firstItem)

                expect(button?.innerHTML).toBe(firstItem.innerHTML)
                expect(firstItem.className).toMatch(/celected/i)
                expect(key.className).toMatch(/active/i)
            }
            fn()
        }
    })

    afterEach(()=>{
        removeListener()
    })
})