# Highlighter
This browser extension saves selected passages of text, or "highlights", while reading in your favorite web browser. The extension saves the highlights to this Rails app: https://github.com/smcalilly/highlighter-rails

Visit https://highlighter.online to see a demo.

The code is a mess. It was one of my first vanilla JS apps. It has two parts:
1) the background and content scripts, which contains all the heavy lifting logic.
2) the popup, which is a basic UI for logging in and rendering login state.