import { useState, useRef } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function ChatBox() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: Date.now(), text: "May I assist you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatInputRef = useRef(null);

  const chatGenerator = async (userRecentMessage) => {
    setTyping(true);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userRecentMessage }],
    });

    const botResponse = chatCompletion.choices[0].message.content;

    const newBotMessage = {
      id: Date.now(),
      text: botResponse,
      sender: "bot",
    };

    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    setTyping(false);
  };

  const handleChatInput = (e) => {
    e.preventDefault();

    const chatInputValue = chatInputRef.current.value.trim();

    if (chatInputValue) {
      const userNewMessage = {
        id: Date.now(),
        text: chatInputValue,
        sender: "user",
      };
      setMessages([...messages, userNewMessage]);
      setInputValue("");
      chatGenerator(userNewMessage.text);
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

  return (
    <div className="flex flex-col w-3/4 max-md:w-full items-center py-10 px-6 min-h-full">
      <header className="flex w-full items-center gap-4 border-b-2">
        <img src="../bot.svg" alt="bot" className="w-16 h-16" />
        <h1 className="text-2xl font-bold">iChatAI</h1>
      </header>
      <main className="chat-body w-full min-h-[95%] justify-between pt-10 flex flex-col gap-4">
        <div className="chat-body w-full max-h-full overflow-y-scroll scrollbar-hide gap-4 grid grid-cols-1">
          {sortedMessages.map((message) => {
            return (
              <div
                key={message.id}
                className={
                  message.sender === "user"
                    ? "chat user justify-self-end"
                    : "chat chat-bot flex relative"
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
                      ? "user-msg bg-human text-white w-max mr-6 lg:mr-[35%] text-base rounded-tr-chat-box rounded-l-chat-box p-4"
                      : "chat-bot-msg bg-bot text-white ml-4 w-max mr-6 lg:mr-[35%] text-base rounded-tl-chat-box rounded-r-chat-box p-4"
                  }
                >
                  {message.sender === "user" ? message.text : message.text}
                </p>
              </div>
            );
          })}
          {typing && (
            <div className="chat chat-bot flex relative">
              <img
                src="../bot.svg"
                alt="bot"
                className="block w-4 h-4 absolute bottom-0"
              />
              <p className="chat-bot-msg bg-bot text-white ml-4 w-max mr-6 lg:mr-[35%] text-base rounded-tl-chat-box rounded-r-chat-box p-4 italic">
                Typing...
              </p>
            </div>
          )}
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
      </main>
    </div>
  );
}

export default ChatBox;
