import React from "react";
import { test, describe, expect } from "@jest/globals";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { getSelectItemsList } from "./getSelectItemsList";

describe('getSelectItemsListTest', ()=>{
    test('correct', ()=>{
        const El = ()=>(<ul data-select-list></ul>)
        const div = document.createElement('div');
        const root = createRoot(div);
        flushSync(() => {root.render(<El />);});

        expect(getSelectItemsList(div)?.dataset.selectList).toBe('true')
    })
})