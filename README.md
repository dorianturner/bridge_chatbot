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
   git clone https://github.com/yourusername/bridge-tech-doc-bot.git
   cd bridge-tech-doc-bot

2. **Create the Virtual Environment**
    ```python
    python3 -m venv venv
    source venv/bin/activate # On Windows use 'venv\Scripts\activate'

3. **Install Dependencies**
    ```bash
    pip install --upgrade openai chainlit literalai slack_bolt aiohttp
    sudo snap ngrok
    ngrok config add-authtoken 2jjFifXyZ5tWxEGYf1wSWRTNxQP_5hVRiC7vE2F6TEtAX6r7F

4. **Set environment variables**
    ```
    Project Key
    export OPENAI_API_KEY="sk-proj-1Qi95ZRjC9W9wVJRnfU3T3BlbkFJ94MjaAak8e4YXpQCnBeQ"

    =================================================================================

    Support Staff Chatbot ID
    export OPENAI_ASSISTANT_ID="asst_OKoiBFCgqLy8LpDc19pMRTKZ"

    Support Slack Bot User OAuth Token
    export SLACK_BOT_TOKEN="xoxb-359415604338-7520987589280-J69Ai1XbFFqeXsQ09qt4OHXZ"

    Support Slack Signing Secret
    export SLACK_SIGNING_SECRET="1a2c86581c1eba7e23d96815a766812a"

    ==================================================================================

    Developer Chatbot ID
    export OPENAI_ASSISTANT_ID="asst_QfWH2k4Av1w8aje3mbY9pd4v"

    Developer Slack Bot User OAuth Token
    export SLACK_BOT_TOKEN="xoxb-359415604338-7461375067063-73A6xQPPMOUTR2YH20Gb1t5b"

    Developer Slack Signing Secret
    export SLACK_SIGNING_SECRET="a0de2fdb2869dfdeba31e31f126f40da"

## Usage

1. **Starting a local instance**
    ```python 
    ngrok http 8000
    chainlit run app.py -w
    ```
    You can find the chat at [localhost 8000](http://localhost:8000)

    For Slack integration see the [chainlit docs](https://docs.chainlit.io/deploy/slack#how-it-works), follow this guide

    For ngrok, copy the forwarding link it gives you e.g. https://8ebb-91-90-105-66.ngrok-free.app and paste into the app manifest yaml config in following the guide.

