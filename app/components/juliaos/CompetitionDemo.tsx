import { useState, useEffect } from 'react';
import { JuliaOSManager } from './JuliaOSManager';

interface DemoResult {
  step: number;
  success?: boolean;
  error?: string;
  message?: string;
  data?: any;
  timestamp?: string;
}

export function CompetitionDemo() {
  const [demoStep, setDemoStep] = useState(0);
  const [demoResults, setDemoResults] = useState<DemoResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const demoSteps = [
    {
      title: "Initialize JuliaOS Framework",
      description: "Setting up LLM and blockchain integration",
      action: "juliaos.initialize"
    },
    {
      title: "Create LLM-Powered Agents",
      description: "Creating autonomous agents with agent.useLLM() capability",
      action: "create_llm_agents"
    },
    {
      title: "Demonstrate Autonomous Decision Making",
      description: "Agents using LLM reasoning for market analysis",
      action: "agent_autonomous_tasks"
    },
    {
      title: "Create Intelligent Swarm",
      description: "Multi-agent coordination with consensus algorithms",
      action: "create_intelligent_swarm"
    },
    {
      title: "Execute Swarm Consensus",
      description: "AI-driven collective decision making",
      action: "swarm_consensus"
    },
    {
      title: "Scan DeFi Opportunities",
      description: "Onchain arbitrage opportunity detection",
      action: "scan_arbitrage"
    },
    {
      title: "Execute Cross-Chain Operations",
      description: "Multi-chain DeFi strategy execution",
      action: "execute_defi"
    },
    {
      title: "Governance Analysis",
      description: "DAO proposal evaluation and voting",
      action: "governance_analysis"
    }
  ];

  const runDemo = async () => {
    setIsRunning(true);
    setDemoResults([]);
    
    for (let i = 0; i < demoSteps.length; i++) {
      setDemoStep(i);
      
      try {
        // Simulate API calls for each demo step
        const response = await fetch('/api/juliaos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'competition_demo',
            payload: { step: demoSteps[i].action }
          }),
        });
        
        const result = await response.json();
        setDemoResults(prev => [...prev, { step: i, ...(result || {}) }]);
        
        // Wait between steps for dramatic effect
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Demo step ${i} failed:`, error);
        setDemoResults(prev => [...prev, { 
          step: i, 
          success: false, 
          error: error instanceof Error ? error.message : String(error)
        }]);
      }
    }
    
    setIsRunning(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          IntelliTrade AI
        </h1>
        <p className="text-xl text-gray-600">
          JuliaOS Competition Demo - Multi-Agent DeFi Strategy Platform
        </p>
        <div className="flex justify-center space-x-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            ✅ LLM Agents
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            ✅ Swarm Intelligence
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            ✅ Onchain DeFi
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
            ✅ Multi-Chain
          </span>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Competition Requirements Demo</h2>
          <button
            onClick={runDemo}
            disabled={isRunning}
            className={`px-6 py-3 rounded-lg font-semibold ${
              isRunning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {isRunning ? 'Running Demo...' : 'Start Competition Demo'}
          </button>
        </div>

        {/* Demo Progress */}
        <div className="space-y-4">
          {demoSteps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                index === demoStep && isRunning
                  ? 'border-blue-500 bg-blue-50'
                  : index < demoStep || (demoResults.find(r => r.step === index))
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="text-2xl">
                  {index === demoStep && isRunning ? (
                    <div className="animate-spin">⚙️</div>
                  ) : demoResults.find(r => r.step === index)?.success !== false ? (
                    index < demoStep || demoResults.find(r => r.step === index) ? '✅' : '⏳'
                  ) : (
                    '❌'
                  )}
                </div>
              </div>
              
              {/* Demo Results */}
              {demoResults.find(r => r.step === index) && (
                <div className="mt-4 p-3 bg-white rounded border">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(demoResults.find(r => r.step === index), null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="text-xl font-semibold mb-2">LLM Agents</h3>
          <p className="text-blue-100">
            Autonomous agents powered by GPT-4, Claude, and other leading models with agent.useLLM() implementation
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="text-3xl mb-2">🐝</div>
          <h3 className="text-xl font-semibold mb-2">Swarm Intelligence</h3>
          <p className="text-purple-100">
            Multi-agent coordination with AI-driven consensus and strategy optimization
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="text-3xl mb-2">⛓️</div>
          <h3 className="text-xl font-semibold mb-2">Onchain DeFi</h3>
          <p className="text-green-100">
            Real blockchain integration with arbitrage, governance, and cross-chain operations
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="text-3xl mb-2">🌐</div>
          <h3 className="text-xl font-semibold mb-2">Multi-Chain</h3>
          <p className="text-orange-100">
            Support for Ethereum, Polygon, Arbitrum, Base, and Solana networks
          </p>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Technical Architecture</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Core Components</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                LLM Agent Engine with autonomous decision making
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Swarm Coordinator with consensus algorithms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Blockchain Integration across multiple networks
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Enhanced UI built on bolt.diy framework
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Innovation Highlights</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                Multi-LLM provider support (OpenAI, Anthropic, Groq)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                AI-driven swarm consensus mechanisms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                Real-time DeFi opportunity scanning
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                No-code agent and swarm creation
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Competition Compliance */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">🏆 Competition Requirements Fulfilled</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-3">Required Features ✅</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                JuliaOS Agent Execution with agent.useLLM()
              </li>
              <li className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                Autonomous LLM-powered decision making
              </li>
              <li className="flex items-center text-green-600">
                <span className="mr-2">✅</span>
                Production-ready implementation
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Bonus Features 🌟</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-600">
                <span className="mr-2">✅</span>
                Swarm Integration with coordination
              </li>
              <li className="flex items-center text-blue-600">
                <span className="mr-2">✅</span>
                Onchain Functionality (Solana & EVM)
              </li>
              <li className="flex items-center text-blue-600">
                <span className="mr-2">✅</span>
                Custom UI/UX Layer
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Embedded JuliaOS Manager */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="bg-gray-50 px-6 py-3 rounded-t-lg border-b">
          <h2 className="text-xl font-semibold">Live JuliaOS Manager Interface</h2>
        </div>
        <JuliaOSManager />
      </div>
    </div>
  );
}
