import { useState, useRef } from "react";
import {OpenAI} from "openai";
import axios from "axios"

// console.log(import.meta.env.VITE_OPENAI_API_KEY)

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});


// const URL = "https://api.openai.com/v1/chat/completions";

const chatGenerator = async () => {
  // const requestOptions = {
  //   // method: "POST",
  //   header: {
  //     'content type': "application/json",
  //     authorization: `bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     messages: [{ role: "system", content: "You are a helpful assistant." }],
  //     model: "gpt-3.5-turbo",
  //   })
  // }

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "What is today's date?" }]
  })

  console.log(chatCompletion)
}

function ChatBox() {
  const [messages, setMessages] = useState([
    {id: Date.now(), text: "May I help you today?", sender: "bot"}
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatInputRef = useRef(null);

  const handleChatInput = (e) => {
    e.preventDefault();

    const chatInputValue = chatInputRef.current.value.trim();

    if (chatInputValue) {
      const newUserMessage = {
        id: Date.now(),
        text: chatInputValue,
        sender: "user",
      };
      setMessages([...messages, newUserMessage]);
      setInputValue("");

      setTimeout(() => {
        const newBotMessage = {
          id: Date.now(),
          text: "This is to test my AI response to see what it looks with a very long text. Not that this is long by the way.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        // chatGenerator()
      }, 3000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatInput(e);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const sortedMessages = messages.sort((a, b) => a.id - b.id);

  // console.log(sortedMessages)

  return (
    <section className="flex flex-col w-3/4 min-h-full items-center py-10 px-4">
      <header className="flex w-full items-center gap-4 border-b-2">
        <img src="../bot.svg" alt="bot" className="w-16 h-16" />
        <h1 className="text-2xl font-bold">iChatAI</h1>
      </header>
      <div className="chat-body w-full h-full justify-between pt-10 flex flex-col">
        <div className="chat-body w-full max-h-full overflow-y-scroll gap-4 grid grid-cols-1">
          {sortedMessages.map((message) => {
            return (
              <div
                key={message.id}
                className={
                  message.sender === "user"
                    ? "chat user h-max max-w-md justify-self-end"
                    : "chat chat-bot h-max max-w-md flex relative"
                }
              >
                <img
                  src="../bot.svg"
                  alt="bot"
                  className={
                    message.sender === "bot"
                      ? "block w-4 h-4 absolute bottom-0"
                      : "hidden"
                  }
                />
                <p
                  className={
                    message.sender === "user"
                      ? "user-msg bg-human text-white h-max max-w-md text-base rounded-tr-chat-box rounded-l-chat-box p-4"
                      : "chat-bot-msg bg-bot text-white ml-4 h-max max-w-md text-base rounded-tl-chat-box rounded-r-chat-box p-4"
                  }
                >
                  {message.sender === "user" ? message.text : message.text}
                </p>
              </div>
            );
          })}
        </div>
        <form
          className="w-full h-16 rounded-chat-box bg-human flex gap-4 items-center px-4 py-2"
          onSubmit={handleChatInput}
        >
          <textarea
            ref={chatInputRef}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={inputValue}
            id="chat-input"
            name="chat-input"
            rows="1"
            placeholder="Ask me anything..."
            className="w-full flex leading-5 bg-transparent text-white border-none outline-none text-base placeholder:text-gray-300 focus:outline-white focus:border-white rounded-chat-box p-2 resize-none"
          />
          <button type="submit" id="send-msg">
            <img src="../send.svg" alt="send icon" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChatBox;
