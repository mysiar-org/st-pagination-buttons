import os

import streamlit.components.v1 as components

_RELEASE = True

if os.getenv('_ST_PAGINATION_BUTTONS_NOT_RELEASE_'):
    _RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "pagination_buttons",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("st_pagination_buttons", path=build_dir)


def st_pagination_buttons(key=None, font_size="10px", width="35px"):
    """Create a new instance of "pagination_buttons".

    Parameters
    ----------
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.
    font_size: str
        The font size of the buttons.
    width: str
        The width of the buttons.
    Returns
    -------
    str
        Value of the key that been pressed.
        Values are: first, previous, next, last
        This is the value passed to `Streamlit.setComponentValue` on the
        frontend.


    """
    component_value = _component_func(key=key, font_size=font_size, width=width, default=None)

    return component_value
