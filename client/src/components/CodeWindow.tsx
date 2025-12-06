import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FileJson, GitBranch, Check, X, Settings, Search, Github } from "lucide-react";

interface CodeWindowProps {
  className?: string;
}

interface CodeToken {
  text: string;
  color: string;
}

// Interface definitions used for type safety
interface CodeLine {
  tokens: CodeToken[];
  indent?: number;
}

const files: Record<string, CodeLine[]> = {
  "developer.tsx": [
    { tokens: [
      { text: "import", color: "text-purple-400" },
      { text: " { ", color: "text-zinc-100" },
      { text: "SeniorEngineer", color: "text-yellow-400" },
      { text: " } ", color: "text-zinc-100" },
      { text: "from", color: "text-purple-400" },
      { text: ' "@expertise/core"', color: "text-green-400" },
      { text: ";", color: "text-zinc-500" },
    ]},
    { tokens: [
      { text: "import", color: "text-purple-400" },
      { text: " type { ", color: "text-zinc-100" },
      { text: "TechStack", color: "text-yellow-400" },
      { text: " } ", color: "text-zinc-100" },
      { text: "from", color: "text-purple-400" },
      { text: ' "./types"', color: "text-green-400" },
      { text: ";", color: "text-zinc-500" },
    ]},
    { tokens: [] },
    { tokens: [
      { text: "class", color: "text-purple-400" },
      { text: " ", color: "text-zinc-100" },
      { text: "LeadDeveloper", color: "text-yellow-400" },
      { text: " ", color: "text-zinc-100" },
      { text: "extends", color: "text-purple-400" },
      { text: " ", color: "text-zinc-100" },
      { text: "SeniorEngineer", color: "text-yellow-400" },
      { text: " {", color: "text-zinc-100" },
    ]},
    { tokens: [
      { text: "constructor", color: "text-blue-400" },
      { text: "() {", color: "text-zinc-100" },
    ], indent: 1 },
    { tokens: [
      { text: "super", color: "text-blue-400" },
      { text: "({", color: "text-zinc-100" },
    ], indent: 2 },
    { tokens: [
      { text: "name", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: ' "Nasir Khan"', color: "text-green-400" },
      { text: ",", color: "text-zinc-500" },
    ], indent: 3 },
    { tokens: [
      { text: "stack", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " {", color: "text-zinc-100" },
    ], indent: 3 },
    { tokens: [
      { text: "frontend", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " [", color: "text-zinc-100" },
      { text: '"Next.js"', color: "text-green-400" },
      { text: ", ", color: "text-zinc-500" },
      { text: '"React"', color: "text-green-400" },
      { text: "]", color: "text-zinc-100" },
      { text: ",", color: "text-zinc-500" },
    ], indent: 4 },
    { tokens: [
      { text: "backend", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " [", color: "text-zinc-100" },
      { text: '"Node.js"', color: "text-green-400" },
      { text: ", ", color: "text-zinc-500" },
      { text: '"Redis"', color: "text-green-400" },
      { text: "]", color: "text-zinc-100" },
    ], indent: 4 },
    { tokens: [
      { text: "}", color: "text-zinc-100" },
    ], indent: 3 },
    { tokens: [
      { text: "});", color: "text-zinc-100" },
    ], indent: 2 },
    { tokens: [
      { text: "}", color: "text-zinc-100" },
    ], indent: 1 },
    { tokens: [
      { text: "}", color: "text-zinc-100" },
    ] },
  ],
  "config.js": [
    { tokens: [
      { text: "export", color: "text-purple-400" },
      { text: " ", color: "text-zinc-100" },
      { text: "default", color: "text-purple-400" },
      { text: " {", color: "text-zinc-100" },
    ]},
    { tokens: [
      { text: "theme", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " 'dark'", color: "text-green-400" },
      { text: ",", color: "text-zinc-500" },
    ], indent: 1 },
    { tokens: [
      { text: "version", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " '2.0.0'", color: "text-green-400" },
      { text: ",", color: "text-zinc-500" },
    ], indent: 1 },
    { tokens: [
      { text: "features", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " {", color: "text-zinc-100" },
    ], indent: 1 },
    { tokens: [
      { text: "animations", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " true", color: "text-orange-400" },
      { text: ",", color: "text-zinc-500" },
    ], indent: 2 },
    { tokens: [
      { text: "performance", color: "text-blue-300" },
      { text: ":", color: "text-zinc-400" },
      { text: " 'optimized'", color: "text-green-400" },
    ], indent: 2 },
    { tokens: [
      { text: "}", color: "text-zinc-100" },
    ], indent: 1 },
    { tokens: [
      { text: "}", color: "text-zinc-100" },
    ] },
  ],
  "style.css": [
    { tokens: [
      { text: ".hero-gradient", color: "text-yellow-400" },
      { text: " {", color: "text-zinc-100" },
    ]},
    { tokens: [
      { text: "background", color: "text-blue-300" },
      { text: ":", color: "text-zinc-100" },
      { text: " radial-gradient(", color: "text-green-400" },
    ], indent: 1 },
    { tokens: [
      { text: "circle", color: "text-orange-400" },
      { text: " at 50% 50%,", color: "text-green-400" },
    ], indent: 2 },
    { tokens: [
      { text: "rgba(139, 92, 246, 0.1),", color: "text-green-400" },
    ], indent: 2 },
    { tokens: [
      { text: "transparent", color: "text-orange-400" },
      { text: " 50%", color: "text-green-400" },
    ], indent: 2 },
    { tokens: [
      { text: ");", color: "text-green-400" },
    ], indent: 1 },
    { tokens: [
      { text: "}", color: "text-zinc-100" },
    ]},
  ]
};

export function CodeWindow({ className }: CodeWindowProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof files>("developer.tsx");
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const codeLines = files[activeTab];

  useEffect(() => {
    setVisibleLines(0);
  }, [activeTab]);

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 50); 
      return () => clearTimeout(timer);
    }
  }, [visibleLines, codeLines.length]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "w-full max-w-2xl rounded-xl overflow-hidden",
        "bg-[#1e1e1e] border border-zinc-700/50",
        "shadow-2xl shadow-black/50",
        className
      )}
      data-testid="code-window"
    >
      {/* Window Controls & Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#1e1e1e]">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
         </div>
         <div className="flex text-xs text-zinc-400 font-medium">nasir-khan — portfolio</div>
         <div className="w-10" /> 
      </div>

      {/* Editor Layout */}
      <div className="flex">
        {/* Sidebar (Activity Bar) */}
        <div className="hidden sm:flex flex-col items-center py-3 w-12 bg-[#333333] border-r border-[#1e1e1e] text-zinc-500 gap-4">
            <FileJson className="w-5 h-5 text-zinc-100" />
            <Search className="w-5 h-5 hover:text-zinc-300 transition-colors" />
            <Github className="w-5 h-5 hover:text-zinc-300 transition-colors" />
            <div className="flex-1" />
            <Settings className="w-5 h-5 hover:text-zinc-300 transition-colors" />
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 bg-[#1e1e1e] flex flex-col min-h-[300px] max-h-[500px]">
             {/* Tabs */}
             <div className="flex bg-[#252526] overflow-x-auto">
                <button 
                  onClick={() => setActiveTab("developer.tsx")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm min-w-fit transition-colors border-t-2",
                    activeTab === "developer.tsx" 
                      ? "bg-[#1e1e1e] border-blue-500 text-zinc-100" 
                      : "bg-transparent border-transparent text-zinc-500 hover:bg-[#2d2d2d]"
                  )}
                >
                    <span className="text-blue-400 text-lg leading-none">TS</span>
                    <span>developer.tsx</span>
                    {activeTab === "developer.tsx" && <X className="w-3 h-3 ml-2 text-zinc-500 hover:text-zinc-300" />}
                </button>
                <button 
                  onClick={() => setActiveTab("config.js")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm min-w-fit transition-colors border-t-2",
                    activeTab === "config.js" 
                      ? "bg-[#1e1e1e] border-yellow-500 text-zinc-100" 
                      : "bg-transparent border-transparent text-zinc-500 hover:bg-[#2d2d2d]"
                  )}
                >
                    <span className="text-yellow-400 text-lg leading-none">JS</span>
                    <span>config.js</span>
                </button>
                <button 
                  onClick={() => setActiveTab("style.css")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm min-w-fit transition-colors border-t-2",
                    activeTab === "style.css" 
                      ? "bg-[#1e1e1e] border-purple-500 text-zinc-100" 
                      : "bg-transparent border-transparent text-zinc-500 hover:bg-[#2d2d2d]"
                  )}
                >
                    <span className="text-purple-400 text-lg leading-none">#</span>
                    <span>style.css</span>
                </button>
             </div>

             {/* Code Area */}
             <div className="p-4 font-mono text-[13px] md:text-sm leading-6 overflow-x-auto custom-scrollbar flex-1">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index < visibleLines ? 1 : 0 }}
                    transition={{ duration: 0 }}
                    className="flex min-w-fit"
                  >
                    <span className="text-zinc-600 w-8 text-right mr-4 select-none shrink-0">
                      {index + 1}
                    </span>
                    
                    <span style={{ paddingLeft: `${(line.indent || 0) * 1.5}rem` }}>
                      {line.tokens.map((token, tokenIndex) => (
                        <span key={tokenIndex} className={token.color}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                    
                    {index === visibleLines - 1 && (
                      <span
                        className={cn(
                          "inline-block w-2 h-5 bg-blue-400 ml-0.5 align-middle",
                          cursorVisible ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                  </motion.div>
                ))}
             </div>

             {/* Status Bar */}
             <div className="h-6 bg-[#007acc] text-white text-[11px] flex items-center px-3 justify-between select-none">
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        <span>main*</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <X className="w-3 h-3 rounded-full bg-transparent" />
                        <span>0</span>
                        <div className="w-3 h-3 flex items-center justify-center">⚠</div>
                        <span>0</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span>Ln {Math.min(visibleLines, codeLines.length)}, Col 1</span>
                    <span>UTF-8</span>
                    <span>
                      {activeTab === "developer.tsx" && "TypeScript React"}
                      {activeTab === "config.js" && "JavaScript"}
                      {activeTab === "style.css" && "CSS"}
                    </span>
                    <div className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Prettier</span>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </motion.div>
  );
}
