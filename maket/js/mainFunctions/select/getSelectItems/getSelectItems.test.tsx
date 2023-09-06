import { test, describe, expect } from "@jest/globals";
import { flushSync } from "react-dom";
import React = require("react");
import { createRoot } from "react-dom/client";
import { getSelectItems } from "./getSelectItems";

describe('getSelectItemsTest', ()=>{
    test('corect', ()=>{
        const El = ()=>(<ul data-select-list><li id="selectItem"/><li id="selectItem"/><li id="selectItem"/></ul>)
        const div = document.createElement('div');
        const root = createRoot(div);
        flushSync(() => {root.render(<El />);});

        getSelectItems(div).forEach(select=>{
            expect(select.id).toBe('selectItem')
        })
    })
})