from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import httpx
from dotenv import load_dotenv
import os

# Updated Templates dictionary
TEMPLATES = {
    "hiring": (
        "🚀 **We’re Hiring!** 🚀\n"
        "{company_name} is growing, and we’re looking for passionate individuals to join our team as a {job_title}. "
        "If you thrive in {qualities}, we’d love to connect with you!\n"
        "📍 Location: {location}\n"
        "📄 Apply here: {job_link}\n"
        "Tag someone who might be a great fit or reach out directly! Let’s build something incredible together. 🙌\n"
        "{expand_on}"
    ),
    "information_sharing": (
        "🌟 Did you know? {fact} 🌟\n"
        "I came across this fascinating {context} about {topic}, and it’s a game-changer! Here’s a quick summary:\n"
        "- {key_point_1}\n"
        "- {key_point_2}\n"
        "- {key_point_3}\n"
        "Dive deeper here: {link}\n"
        "Let’s discuss—how does this resonate with your experience? 🤔\n"
        "{expand_on}"
    ),
    "thought_leadership": (
        "💡 **The Future of {field} is Now** 💡\n"
        "As we navigate the evolving landscape of {field}, one trend stands out: {trend}.\n"
        "Here’s what I believe:\n"
        "- {perspective_1}\n"
        "- {perspective_2}\n"
        "- {steps_to_adapt}\n"
        "I’d love to hear your thoughts—how are you preparing for this shift? Let's start a conversation. 📢\n"
        "{expand_on}"
    ),
    "event_promotion": (
        "🎉 Excited to announce {event_name}! 🎉\n"
        "Join us on {date} at {time} for {details}.\n"
        "Why attend?\n"
        "✅ {benefit_1}\n"
        "✅ {benefit_2}\n"
        "✅ {benefit_3}\n"
        "📍 Location: {location}\n"
        "🖋️ Register here: {registration_link}\n"
        "Let’s come together to {objective}. Looking forward to seeing you there!\n"
        "{expand_on}"
    ),
}



app = FastAPI()
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API endpoint and API key
url = "https://api.x.ai/v1/chat/completions"  # Replace with the actual API endpoint
# Load environment variables from .env file
load_dotenv()

# Retrieve the GROK_API_KEY from environment variables
api_key = os.getenv("GROK_API_KEY")



# Headers for authentication
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

async def ask_grok(initial_prompt):
    # data = {
    #     "prompt": initial_prompt
    # }
     # Payload with chat messages and model parameters
    data = {
        "messages": [
            {
                "role": "system",
                "content": "You are Social Media Post Helper, a chatbot that assists with creating engaging social media content"
            },
            {
                "role": "user",
                "content": initial_prompt
            }
        ],
        "model": "grok-2-1212",
        "stream": False,
        "temperature": 0,
    }
    try:
        # Make the POST request
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=data, headers=headers)
        print(response.json())
        return response.json()
    except Exception as e:
        print(e)
        return None
    

@app.get("/")
async def root(request: Request):
    bot = request.query_params
    platform = bot.get("platform")
    tone = bot.get("tone")
    template = bot.get("template")
    raw_content = bot.get("raw_content")
    initial_prompt = (
        f"You have to make social media posts for a {platform} account. "
        f"The content should be {tone}. The post should obey the following template: {TEMPLATES.get(template)}. "
        f"Add relevant hashtags and keywords to increase engagement. "
        f"Here is the raw content: {raw_content}"
    )    
    
    
    response = await ask_grok(initial_prompt)
    return {"message": initial_prompt, "response": response}
    
