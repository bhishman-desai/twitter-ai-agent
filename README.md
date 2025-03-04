# Twitter/X AI Agent - Your Social Media Helper

## Project Overview
This is an AI tool that helps you manage your Twitter/X account. It takes your thoughts and turns them into well-written tweets. It’s like having a personal assistant for your social media, making it easier to share your ideas and connect with your audience.

### App Screenshots
**Pictures of the app will be added here.**

## Learnings
I built this project to explore two things: Socket.io for real-time communication and OpenAI for AI capabilities. As someone who tweets a lot, I often struggle to put my thoughts into words that resonate with my audience. This tool helps me (and others) by turning raw ideas into polished tweets. It’s especially useful for content creators who rely on social media for their work.

## Getting Started
To run this project on your computer, follow these steps:

1. **Download the project:**
   ```bash
   git clone https://github.com/yourusername/twitter-ai-agent.git
   cd twitter-ai-agent
   ```
2. **Create a .env file:**
   ```bash
   OPENAI_API_KEY='your_openai_api_key_here'
   PORT=8999
   ```
3. **Install the required dependencies and start project:**
   ```bash
   npm install
   npm run dev
   ```
## Tech Used
1. **Socket.io:**  Used for real-time communication between the client and server.
2. **OpenAI:**: Powers the AI to understand user input and generate meaningful responses using the app tools.

## Contributing
I welcome contributions! If you have ideas or want to add new features, you can start by adding your tools in ```utils/agent/tools.js```. The app will automatically detect and use these tools when needed.

### Future Plans
1. **Direct Tweeting:** Allow users to post tweets directly from the app.
2. **Threads with AI-Generated Images:** Create Twitter threads with images generated by AI for better engagement.