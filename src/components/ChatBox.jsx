import { useState, useRef } from "react";

function ChatBox() {
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatInputRef = useRef(null);

  const handleChatInput = (e) => {
    e.preventDefault();

    const chatInputValue = chatInputRef.current.value.trim();

    if (chatInputValue) {
      const newUserMessage = { id: crypto.randomUUID(), text: chatInputValue };
      setUserMessages([...userMessages, newUserMessage]);
      setInputValue('');

      setTimeout(() => {
        const newBotMessage = {id: crypto.randomUUID(), text: "This is test my AI response to see what it looks with a very long text. Not that this is long by the way."};
        setBotMessages([...botMessages, newBotMessage]);
      }, 3000);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleChatInput(e);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  // const sortedMessages = messages.sort((a, b) => a.id -b.id);


  return (
    <section className="flex flex-col w-3/4 min-h-full items-center py-10 px-4">
      <div className="flex w-full items-center gap-4 border-b-2">
        <img src="../bot.svg" alt="bot" className="w-16 h-16" />
        <h1 className="text-2xl font-bold">iChatAI</h1>
      </div>
      <div className="chat-body w-full h-full justify-between pt-10 flex flex-col">
        <div className="chat-body w-full max-h-full overflow-y-scroll gap-4 grid grid-cols-1">
          <div className="chat chat-bot h-max max-w-md flex relative">
            <img
              src="../bot.svg"
              alt="bot"
              className="w-4 h-4 absolute bottom-0"
            />
            <p className="chat-bot-msg bg-bot text-white ml-4 h-max max-w-md text-base rounded-tl-chat-box rounded-r-chat-box p-4">
              May I help you today?
            </p>
          </div>
          {userMessages.map(message => {
            return (
              <div key={message.id} className="chat user h-max max-w-md justify-self-end">
                <p className="user-msg bg-human text-white h-max max-w-md text-base rounded-tr-chat-box rounded-l-chat-box p-4">
                  {message.text}
                </p>
              </div>
          )})}
          {botMessages.map(botMessage => {
            return (
              <div key={botMessage.id} className="chat chat-bot h-max max-w-md flex relative">
                <img
                  src="../bot.svg"
                  alt="bot"
                  className="w-4 h-4 absolute bottom-0"
                />
                <p className="chat-bot-msg bg-bot text-white ml-4 h-max max-w-md text-base rounded-tl-chat-box rounded-r-chat-box p-4">
                  {botMessage.text}
                </p>
              </div>
            )})}
        </div>
        <form className="w-full h-16 rounded-chat-box bg-human flex gap-4 items-center px-4 py-2" onSubmit={handleChatInput}>
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
