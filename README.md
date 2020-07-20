# Highlighter
This browser extension saves selected passages of text, or "highlights", while reading in your favorite web browser. The extension saves the highlights to this Rails app: https://github.com/smcalilly/highlighter-rails

Visit https://highlighter.online to see a demo.

A browser extension has three parts:
- **background scripts**: The logic for saving highlights lives here. I consider this "UI" because it handles how the user copies the text from the browser and displays messages via the browser's notifications.
- **content scripts**: this allows the extension to interact with the DOM. When a user selects text, the content script executes and get the selected text. It sends this text to the background script. This is how the extension API is designed, where the scripts pass messages between each other.
- **popup scripts**:a basic UI for logging in and rendering login state. 

The nature of a browser extension and it's limitations makes me inclined to keep each piece isolated. For instance, it's possible that I could "pass messages" via the extension API about the authentication state, between the background's API service and the popup. That creates some callback nastiness so I decided to repeat myself in some places. I don't know what the right approach is, but it doesn't matter because this is a low stakes project without the expectation of other maintainers beside myself. I'm making it up as I go, asking questions like, is it possible to do that/how do you do it? This was a prototype that I threw together over a couple of weeks and haven't maintained much since. This is the ugliest mess of procedural code. I've given myself more tech debt than I want to deal with if I were to make it better...I'd almost want to start from scratch, now that I know how browser extensions work. Basically, I'm making excuses for bad code !

`web-ext build` to build an archive for app store submission.