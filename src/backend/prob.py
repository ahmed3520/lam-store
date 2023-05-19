import sys
import json
from hugchat import hugchat
import os

def main():
    # Get the user input from the command-line argument
    user_input = sys.argv[1]
    # Create a chatbot connection
    script_dir = os.path.dirname(os.path.abspath(__file__))
    cookie_path = os.path.join(script_dir, "cookies.json")
    chatbot = hugchat.ChatBot(cookie_path=cookie_path)
    # New a conversation (ignore error)
    id = chatbot.new_conversation()
    chatbot.change_conversation(id)
    # Get the response from the chatbot
    response = chatbot.chat(user_input)
    # Print the response as JSON
    print(json.dumps(response))
    return json.dumps(response)


if __name__ == '__main__':
    main()
