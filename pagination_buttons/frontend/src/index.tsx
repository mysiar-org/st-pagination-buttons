import { RenderData, Streamlit } from "streamlit-component-lib"

const BUTTON_ATTR_RETURNS = "element-returns"

const buttonBorder = "1px solid"

const buttonStyle: CSSStyleDeclaration = {
  marginRight: "5px",
  border: buttonBorder,
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontWeight: "bold",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "8px",
  outline: "0px !important"
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
      button.style.color = theme.textColor
      button.style.backgroundColor = theme.backgroundColor
      button.style.border = buttonBorder
      button.style.fontSize = data.args["font_size"]
      button.style.width = data.args["width"]

      Object.assign(button.style, buttonStyle)

      button.onmouseover = function(): void {
        button.style.color = theme.primaryColor
        button.style.borderColor = theme.primaryColor
      }

      button.onmouseout = function(): void {
        button.style.color = theme.textColor
        button.style.backgroundColor = theme.backgroundColor
        button.style.border = buttonBorder
      }

      button.onclick = function(): void {
        Streamlit.setComponentValue(button.getAttribute(BUTTON_ATTR_RETURNS))
      }

      button.onmousedown = function(): void {
        button.style.color = theme.textColor
        button.style.backgroundColor = theme.primaryColor
        button.style.border = "1px solid " + theme.primaryColor
      }

      button.onmouseup = function(): void {
        button.style.color = theme.textColor
        button.style.backgroundColor = theme.backgroundColor
        button.style.border = buttonBorder
      }
    }
  }
  Streamlit.setFrameHeight()
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()
Streamlit.setFrameHeight()
