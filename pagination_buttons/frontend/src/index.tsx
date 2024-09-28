import {RenderData, Streamlit} from "streamlit-component-lib"

const BUTTON_MARGIN_RIGHT = "5px"
const BUTTON_WIDTH = "35px"
const BUTTON_ATTR_RETURNS = "element-returns"

const span = document.body.appendChild(document.createElement("span"))

const first = span.appendChild(document.createElement("button"))
first.textContent = "<<"
first.setAttribute("title", "First")
first.setAttribute(BUTTON_ATTR_RETURNS, "first")

const previous = span.appendChild(document.createElement("button"))
previous.textContent = "<"
previous.setAttribute("title", "Previous")
previous.setAttribute(BUTTON_ATTR_RETURNS, "previous")

const next = span.appendChild(document.createElement("button"))
next.textContent = ">"
next.setAttribute("title", "Next")
next.setAttribute(BUTTON_ATTR_RETURNS, "next")

const last = span.appendChild(document.createElement("button"))
last.textContent = ">>"
last.setAttribute("title", "Last")
last.setAttribute(BUTTON_ATTR_RETURNS, "last")

const PaginationButtons = [first, previous, next, last]

for (const button of PaginationButtons) {
    button.style.width = BUTTON_WIDTH
    button.style.marginRight = BUTTON_MARGIN_RIGHT
    button.onclick = function (): void {
        Streamlit.setComponentValue(button.getAttribute(BUTTON_ATTR_RETURNS))
    }
}

function onRender(event: Event): void {
    // Get the RenderData from the event
    const data = (event as CustomEvent<RenderData>).detail
    if (data.theme) {
        for (const button of PaginationButtons) {
            button.style.color = data.theme.primaryColor
            button.style.backgroundColor = data.theme.secondaryBackgroundColor
            button.style.border = `1px solid`
        }
    }
    Streamlit.setFrameHeight()
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()
Streamlit.setFrameHeight()
