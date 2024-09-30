import streamlit as st

from pagination_buttons import pagination_buttons

clicked_button = pagination_buttons()

st.write(f"Clicked: {clicked_button}")