import streamlit as st

from st_pagination_buttons import st_pagination_buttons

st.title("Pagination buttons")

clicked_button = st_pagination_buttons(key="spg0")

st.write(f"Clicked: {clicked_button}")

st.button("Test button to check colors", key="b0")

clicked_button = st_pagination_buttons(key="spg8", border_radius=8)

st.write(f"Clicked: {clicked_button}")

st.button("Test button to check colors", key="b8")
