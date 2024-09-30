import streamlit as st

from st_pagination_buttons import st_pagination_buttons

st.title("Pagination buttons")

clicked_button = st_pagination_buttons()

st.write(f"Clicked: {clicked_button}")

st.button("Test button to check colors")