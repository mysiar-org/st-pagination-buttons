import { RenderData, Streamlit } from "streamlit-component-lib"

const BUTTON_ATTR_RETURNS = "element-returns"


const buttonStyle: CSSStyleDeclaration = {
  marginRight: "5px",
  width: "35px",
  border: "1px solid",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "10px",
  fontWeight: "bold",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "15px",
  transition: "background-color 0.3s ease",
} as CSSStyleDeclaration

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

const paginationButtons = [first, previous, next, last]

function onRender(event: Event): void {
  const data = (event as CustomEvent<RenderData>).detail
  if (data.theme) {
    const theme = data.theme
    for (const button of paginationButtons) {
      button.style.color = theme.primaryColor
      button.style.backgroundColor = theme.secondaryBackgroundColor
      button.style.border = `1px solid`

      Object.assign(button.style, buttonStyle)

      button.onclick = function(): void {
        Streamlit.setComponentValue(button.getAttribute(BUTTON_ATTR_RETURNS))
      }
      button.onmouseover = function(): void {
        button.style.backgroundColor = "red"
      }
      button.onmouseout = function(): void {
        button.style.backgroundColor = theme.secondaryBackgroundColor
      }

    }
  }
  Streamlit.setFrameHeight()
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()
Streamlit.setFrameHeight()
