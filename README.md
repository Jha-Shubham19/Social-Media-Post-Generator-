# Social Media Post Generator
![Screenshot 2024-12-31 121216](https://github.com/user-attachments/assets/bffd1f1a-a63b-41d5-b8ee-d940f416023a)
![Screenshot 2024-12-31 121158](https://github.com/user-attachments/assets/0a9b4785-6c28-4168-bff2-ea5b195bce62)

## Overview

The **Social Media Post Generator** is an innovative tool designed to assist users in creating engaging social media content tailored for different platforms, tones, and templates. By leveraging AI, the application generates customized posts that meet specific user requirements.

## Key Features

- **AI-Powered Content Creation**: Utilizes advanced AI models to generate creative and relevant social media posts.
- **Multiple Templates**: Offers various predefined templates (e.g., event promotion, thought leadership, information sharing, hiring) for diverse use cases.
- **Customizable Content**: Allows users to input specific details (platform, tone, raw content) to generate tailored posts.
- **Real-time Preview and Copy**: Provides a modal to preview and copy generated content easily.

## Use Cases

- **Event Promotion**: Generate posts for upcoming events with essential details and benefits.
- **Hiring**: Create job advertisements with key qualifications and details.
- **Thought Leadership**: Share industry insights or leadership content.
- **Information Sharing**: Disseminate informative posts based on user-provided content.

## Problem Solving

The tool addresses the challenge of creating engaging and consistent social media posts at scale by automating the content generation process, saving time, and enhancing user engagement.

## Use of AI

- The backend uses FastAPI to handle requests and communicate with the AI model (`grok-2-1212`), which generates content based on user inputs.
- The frontend built with React allows seamless interaction, submission of data, and display of AI-generated posts in a modal.

## Setup Instructions

### Prerequisites

- Python 3.x
- Node.js (for frontend dependencies)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/social-media-post-generator.git
   cd social-media-post-generator/backend

2. Set up a virtual environment and install dependencies:

   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

3. Create a `.env` file in the backend directory and add your API key:

   ```plaintext
   GROK_API_KEY=your_api_key_here
   
4. Run main.py
   ```bash
   fastapi dev main.py

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the development server using Vite:

   ```bash
   npm run dev
