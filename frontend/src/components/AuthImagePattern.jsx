const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-10">
        <div className="w-full max-w-md text-center">
          {/* Chat Container */}
          <div className="relative bg-base-300 rounded-2xl p-6 h-[28rem] overflow-hidden shadow-xl border border-primary/20 mb-8">
            <div className="absolute inset-0 flex flex-col gap-4 p-4 animate-chat-flow overflow-y-auto">
  
              {/* User 1 (Text Message) */}
              <div className="flex items-end gap-2 self-start animate-message-left">
                <div className="size-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">KD</div>
                <div className="bg-primary/20 text-primary p-3 rounded-2xl rounded-bl-none max-w-xs text-left">
                  Morning guys! 🌞
                </div>
              </div>
  
              {/* User 2 (Photo Message) */}
              <div className="flex items-end gap-2 self-end animate-message-right delay-200">
                <div className="bg-primary/10 p-2 rounded-2xl rounded-br-none max-w-[12rem]">
                <img src="..\public\images\animation.jpg" alt="Cute Cat" className="rounded-xl" />
                <p className="text-xs text-base-content/50 mt-1">Peace 😺</p>
                </div>
                <div className="size-9 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold">AM</div>
              </div>
  
              {/* Typing Indicator (User 3) */}
              <div className="flex items-center gap-2 self-start animate-message-left delay-400">
                <div className="size-9 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">JS</div>
                <div className="bg-accent/20 text-accent p-3 rounded-2xl rounded-bl-none max-w-xs text-left flex gap-1 items-center">
                  <span className="dot bg-accent w-2 h-2 rounded-full animate-bounce" />
                  <span className="dot bg-accent w-2 h-2 rounded-full animate-bounce delay-100" />
                  <span className="dot bg-accent w-2 h-2 rounded-full animate-bounce delay-200" />
                </div>
              </div>
  
              {/* User 1 (Big Message) */}
              <div className="flex items-end gap-2 self-start animate-message-left delay-600">
                <div className="size-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">KD</div>
                <div className="bg-primary/20 text-primary p-3 rounded-2xl rounded-bl-none max-w-xs text-left">
                  Hahaha omg that's adorable 😂<br />
                  Ready for the team call today? 🎯
                </div>
              </div>
  
              {/* User 2 (Reply) */}
              <div className="flex items-end gap-2 self-end animate-message-right delay-800">
                <div className="bg-primary/10 text-base-content p-3 rounded-2xl rounded-br-none max-w-xs text-left">
                  Absolutely! 🎙️ Let's crush it.
                </div>
                <div className="size-9 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold">AM</div>
              </div>
  
            </div>
          </div>
  
          {/* Title & Subtitle */}
          <h2 className="text-2xl font-bold mb-2 text-primary">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  