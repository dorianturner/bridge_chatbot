# Bridge Tech Documentation Chatbot

**Date:** July 24, 2024  
**Author:** Dorian Turner
## Table of Contents
1. [Introduction](#introduction)
2. [Setup Environment](#setup-environment)
3. [Usage](#usage)


## Introduction
The Bridge Tech Documentation Chatbot is designed to assist users in finding relevant information from our documentation more quickly. This guide provides instructions on setting up the environment, usage, and troubleshooting.

## Setup Environment

### Prerequisites
- Python 3.8+
- pip (Python package installer)
- Virtual environment tool

### Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dorianturner/bridge_chatbot.git
   username: dorianemmanuelturner@gmail.com
   password: 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

   cd bridge-tech-doc-bot

2. **Create the Virtual Environment**
    ```python
    python3 -m venv venv
    source venv/bin/activate # On Windows use 'venv\Scripts\activate'

3. **Install Dependencies**
    ```bash
    pip install --upgrade openai chainlit literalai slack_bolt aiohttp
    sudo snap ngrok
    ngrok config add-authtoken <Your Auth Token>

4. **Set environment variables**
    ```
    Project Key
    export OPENAI_API_KEY="sk-..."

    =================================================================================

    Support Staff Chatbot ID
    export OPENAI_ASSISTANT_ID="asst_..."

    Support Slack Bot User OAuth Token
    export SLACK_BOT_TOKEN="xoxb-..."

    Support Slack Signing Secret
    export SLACK_SIGNING_SECRET="..."

    ==================================================================================

    Developer Chatbot ID
    export OPENAI_ASSISTANT_ID="asst_..."

    Developer Slack Bot User OAuth Token
    export SLACK_BOT_TOKEN="xoxb-..."

    Developer Slack Signing Secret
    export SLACK_SIGNING_SECRET="..."

## Usage

1. **Starting a local instance**
    ```python 
    ngrok http 8000
    chainlit run app.py -w
    ```
    You can find the chat at [localhost 8000](http://localhost:8000)

    For Slack integration see the [chainlit docs](https://docs.chainlit.io/deploy/slack#how-it-works), follow this guide

    For ngrok, copy the forwarding link it gives you e.g. https://8ebb-91-90-105-66.ngrok-free.app and paste into the app manifest yaml config in following the guide.

