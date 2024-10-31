import {RenderData, Streamlit} from "streamlit-component-lib"

const BUTTON_ATTR_RETURNS: string = "element-returns"

const borderColor: string = "lightgray"


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

const paginationButtons = [
    {element: first, name: "first"},
    {element: previous, name: "previous"},
    {element: next, name: "next"},
    {element: last, name: "last"},
]

function onRender(event: Event): void {

    const data = (event as CustomEvent<RenderData>).detail
    const {args} = data;
    const {
        font_size,
        width,
        border_radius,
        key,
    } = args


    const buttonStyle: CSSStyleDeclaration = {
        marginRight: "5px",
        border: "1px solid",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontWeight: "bold",
        margin: "4px 2px",
        cursor: "pointer",
        borderRadius: `${border_radius}px`,
        outline: "none !important"
    } as CSSStyleDeclaration


    if (data.theme) {
        const theme = data.theme
        for (const {element: button, name} of paginationButtons) {
            Object.assign(button.style, buttonStyle)

            button.id = `${key}-${name}`
            button.style.color = theme.textColor
            button.style.backgroundColor = theme.backgroundColor
            button.style.borderColor = borderColor
            button.style.fontSize = font_size
            button.style.width = width

            button.onmouseover = function (): void {
                button.style.color = theme.primaryColor
                button.style.borderColor = theme.primaryColor
            }

            button.onmouseout = function (): void {
                button.style.color = theme.textColor
                button.style.backgroundColor = theme.backgroundColor
                button.style.borderColor = borderColor
            }

            button.onclick = function (): void {
                Streamlit.setComponentValue(button.getAttribute(BUTTON_ATTR_RETURNS))
            }

            button.onmousedown = function (): void {
                button.style.color = "white"
                button.style.backgroundColor = theme.primaryColor
            }

            button.onmouseup = function (): void {
                button.style.color = theme.textColor
                button.style.backgroundColor = theme.backgroundColor
                button.style.borderColor = borderColor
            }
        }
    }
    Streamlit.setFrameHeight()
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()
Streamlit.setFrameHeight()
