import streamlit as st

from st_pagination_buttons import st_pagination_buttons

clicked_button = st_pagination_buttons()

st.write(f"Clicked: {clicked_button}")