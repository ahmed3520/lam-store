import sys
import json
from hugchat import hugchat


def main():
    # Get the user input from the command-line argument
    user_input = sys.argv[1]
    # Create a chatbot connection
    chatbot = hugchat.ChatBot(cookie_path="cookies.json")
    # New a conversation (ignore error)
    id = chatbot.new_conversation()
    chatbot.change_conversation(id)
    # Get the response from the chatbot
    response = chatbot.chat(user_input)
    # Print the response as JSON
    print(json.dumps(response))


if __name__ == '__main__':
    main()
