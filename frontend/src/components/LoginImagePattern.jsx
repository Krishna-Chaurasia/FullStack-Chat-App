const LoginImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="w-full max-w-md text-center">
          {/* Chat container */}
          <div className="bg-base-300 rounded-xl shadow-md p-6 h-96 overflow-hidden relative mb-8 border border-primary/20">
            <div className="absolute inset-0 flex flex-col gap-4 p-4 animate-chat-flow">
              {/* User A */}
              <div className="flex items-center gap-2 self-start animate-message-left">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <div className="bg-primary/20 text-primary p-3 rounded-2xl rounded-bl-none max-w-xs text-left">
                  Hey team! 🚀
                </div>
              </div>
  
              {/* User B */}
              <div className="flex items-center gap-2 self-end animate-message-right">
                <div className="bg-primary/10 text-base-content p-3 rounded-2xl rounded-br-none max-w-xs text-left">
                  Hello! Ready to start today's meeting? 🧑‍💻
                </div>
                <div className="size-8 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold">
                  B
                </div>
              </div>
  
              {/* User C */}
              <div className="flex items-center gap-2 self-start animate-message-left delay-500">
                <div className="size-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold">
                  C
                </div>
                <div className="bg-accent/20 text-accent p-3 rounded-2xl rounded-bl-none max-w-xs text-left">
                  Good morning! ☀️ Let's do this!
                </div>
              </div>
  
              {/* User A again */}
              <div className="flex items-center gap-2 self-end animate-message-right delay-700">
                <div className="bg-primary/10 text-base-content p-3 rounded-2xl rounded-br-none max-w-xs text-left">
                  Sharing the notes in 2 mins ⏳
                </div>
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
  
          {/* Title and Subtitle */}
          <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default LoginImagePattern;
  