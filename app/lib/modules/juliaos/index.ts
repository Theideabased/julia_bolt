// JuliaOS Module Exports
export { JuliaOSBridge } from './bridge';
export { JuliaOSAgents } from './agents';
export { JuliaOSSwarms } from './swarms';
export { LLMAgent } from './llm-agent';
export { SwarmCoordinator } from './swarm-coordinator';
export { BlockchainIntegration } from './blockchain';

// Types
export type {
  JuliaOSConfig,
  AgentConfig,
  AgentInfo,
  SwarmConfig,
  SwarmInfo,
} from './bridge';

export type {
  DevAgentConfig,
  ResearchAgentConfig,
  TestingAgentConfig,
  DeploymentAgentConfig,
  MonitoringAgentConfig,
} from './agents';

export type {
  WebDevSwarmConfig,
  ResearchSwarmConfig,
  OptimizationResult,
} from './swarms';

export type {
  LLMConfig,
  LLMMessage,
  LLMResponse,
  AgentTask,
  AgentMemory,
} from './llm-agent';

export type {
  SwarmStrategy,
  SwarmDecision,
  SwarmPerformance,
} from './swarm-coordinator';

export type {
  OnChainConfig,
  TokenInfo,
  TransactionResult,
  DeFiPosition,
  ArbitrageOpportunity,
  GovernanceProposal,
} from './blockchain';

// Main JuliaOS integration class
import { JuliaOSBridge, type JuliaOSConfig } from './bridge';
import { JuliaOSAgents } from './agents';
import { JuliaOSSwarms } from './swarms';
import { LLMAgent, type LLMConfig, type AgentTask } from './llm-agent';
import { SwarmCoordinator, type SwarmStrategy } from './swarm-coordinator';
import { BlockchainIntegration, type OnChainConfig } from './blockchain';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('JuliaOS');

export interface JuliaOSEnhancedConfig extends JuliaOSConfig {
  llm?: LLMConfig;
  blockchain?: OnChainConfig;
}

/**
 * Enhanced JuliaOS class with LLM-powered agents and blockchain integration
 * This is the main entry point for the competition implementation
 */
export class JuliaOS {
  private bridge: JuliaOSBridge;
  private agents: JuliaOSAgents;
  private swarms: JuliaOSSwarms;
  private blockchain?: BlockchainIntegration;
  private llmAgents: Map<string, LLMAgent> = new Map();
  private swarmCoordinators: Map<string, SwarmCoordinator> = new Map();
  private config: JuliaOSEnhancedConfig;

  constructor(config: JuliaOSEnhancedConfig = {}) {
    this.config = config;
    this.bridge = new JuliaOSBridge(config);
    this.agents = new JuliaOSAgents(this.bridge);
    this.swarms = new JuliaOSSwarms(this.bridge);
    
    // Initialize blockchain integration if config provided
    if (config.blockchain) {
      this.blockchain = new BlockchainIntegration(config.blockchain);
    }
  }

  async initialize(): Promise<void> {
    await this.bridge.initialize();
    
    // Initialize blockchain connection if configured
    if (this.blockchain) {
      await this.blockchain.initialize();
      logger.info('Blockchain integration initialized');
    }
    
    logger.info('Enhanced JuliaOS initialized successfully');
  }

  async disconnect(): Promise<void> {
    // Stop all LLM agents
    for (const [agentId, llmAgent] of this.llmAgents) {
      llmAgent.stop();
    }
    
    // Stop all swarm coordinators
    for (const [swarmId, coordinator] of this.swarmCoordinators) {
      coordinator.stop();
    }
    
    // Disconnect blockchain
    if (this.blockchain) {
      await this.blockchain.disconnect();
    }
    
    await this.bridge.disconnect();
    logger.info('Enhanced JuliaOS disconnected');
  }

  isConnected(): boolean {
    return this.bridge.isConnected();
  }

  /**
   * Create LLM-powered agent with autonomous capabilities
   * This implements the required agent.useLLM() functionality
   */
  async createLLMAgent(
    name: string,
    type: string,
    config: any,
    llmConfig?: LLMConfig
  ): Promise<LLMAgent> {
    // Create basic agent first
    const agentInfo = await this.agents.createAgent({
      name,
      type: type as any,
      config,
      capabilities: ['llm', 'autonomous', 'learning'],
      networks: this.blockchain ? [this.blockchain.getNetwork()] : []
    });

    // Create LLM agent wrapper
    const effectiveLLMConfig = llmConfig || this.config.llm || {
      provider: 'openai',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000
    };

    const llmAgent = new LLMAgent(this.bridge, agentInfo, effectiveLLMConfig);
    this.llmAgents.set(agentInfo.id, llmAgent);
    
    logger.info(`Created LLM agent: ${name} (${agentInfo.id})`);
    return llmAgent;
  }

  /**
   * Create intelligent swarm with coordination algorithms
   */
  async createIntelligentSwarm(
    name: string,
    strategy: SwarmStrategy,
    agentIds: string[]
  ): Promise<SwarmCoordinator> {
    // Create basic swarm
    const swarmInfo = await this.swarms.createSwarm({
      name,
      algorithm: {
        type: 'hierarchical', // Default algorithm type
        params: {
          coordination: 'ai_consensus',
          decisionThreshold: strategy.rules.consensusThreshold
        }
      },
      config: {
        strategy: strategy.type,
        riskTolerance: strategy.rules.riskTolerance,
        maxActions: strategy.rules.maxSimultaneousActions
      },
      agents: agentIds
    });

    // Create swarm coordinator
    const coordinator = new SwarmCoordinator(this.bridge, swarmInfo, strategy);
    
    // Add LLM agents to coordinator
    for (const agentId of agentIds) {
      const llmAgent = this.llmAgents.get(agentId);
      if (llmAgent) {
        const agentInfo = await this.agents.getAgentStatus(agentId);
        await coordinator.addAgent(agentInfo, llmAgent);
      }
    }
    
    this.swarmCoordinators.set(swarmInfo.id, coordinator);
    
    logger.info(`Created intelligent swarm: ${name} (${swarmInfo.id})`);
    return coordinator;
  }

  /**
   * Start autonomous agent execution
   */
  async startAgent(agentId: string): Promise<void> {
    await this.agents.startAgent(agentId);
    
    const llmAgent = this.llmAgents.get(agentId);
    if (llmAgent) {
      await llmAgent.start();
      logger.info(`Started autonomous LLM agent: ${agentId}`);
    }
  }

  /**
   * Stop agent execution
   */
  async stopAgent(agentId: string): Promise<void> {
    await this.agents.stopAgent(agentId);
    
    const llmAgent = this.llmAgents.get(agentId);
    if (llmAgent) {
      llmAgent.stop();
      logger.info(`Stopped autonomous LLM agent: ${agentId}`);
    }
  }

  /**
   * Start swarm coordination
   */
  async startSwarm(swarmId: string): Promise<void> {
    await this.swarms.startSwarm(swarmId);
    
    const coordinator = this.swarmCoordinators.get(swarmId);
    if (coordinator) {
      await coordinator.start();
      logger.info(`Started swarm coordination: ${swarmId}`);
    }
  }

  /**
   * Stop swarm coordination
   */
  async stopSwarm(swarmId: string): Promise<void> {
    await this.swarms.stopSwarm(swarmId);
    
    const coordinator = this.swarmCoordinators.get(swarmId);
    if (coordinator) {
      coordinator.stop();
      logger.info(`Stopped swarm coordination: ${swarmId}`);
    }
  }

  /**
   * Execute task with specific agent
   */
  async executeAgentTask(agentId: string, task: AgentTask): Promise<any> {
    const llmAgent = this.llmAgents.get(agentId);
    if (!llmAgent) {
      throw new Error(`LLM agent ${agentId} not found`);
    }

    return await llmAgent.executeTask(task);
  }

  /**
   * Add task to agent queue
   */
  addTaskToAgent(agentId: string, task: AgentTask): void {
    const llmAgent = this.llmAgents.get(agentId);
    if (!llmAgent) {
      throw new Error(`LLM agent ${agentId} not found`);
    }

    llmAgent.addTask(task);
  }

  /**
   * Get agent status including LLM capabilities
   */
  async getEnhancedAgentStatus(agentId: string): Promise<any> {
    const basicStatus = await this.agents.getAgentStatus(agentId);
    const llmAgent = this.llmAgents.get(agentId);
    
    if (llmAgent) {
      const llmStatus = llmAgent.getStatus();
      return {
        ...basicStatus,
        llm: llmStatus,
        autonomous: true
      };
    }
    
    return basicStatus;
  }

  /**
   * Get swarm performance metrics
   */
  getSwarmPerformance(swarmId: string): any {
    const coordinator = this.swarmCoordinators.get(swarmId);
    if (!coordinator) {
      throw new Error(`Swarm coordinator ${swarmId} not found`);
    }

    return coordinator.getPerformance();
  }

  // Blockchain integration methods
  async scanArbitrageOpportunities(tokenPairs: string[]): Promise<any[]> {
    if (!this.blockchain) {
      throw new Error('Blockchain integration not configured');
    }

    return await this.blockchain.scanArbitrageOpportunities(tokenPairs);
  }

  async executeArbitrage(opportunity: any): Promise<any> {
    if (!this.blockchain) {
      throw new Error('Blockchain integration not configured');
    }

    return await this.blockchain.executeArbitrage(opportunity);
  }

  async getGovernanceProposals(dao: string): Promise<any[]> {
    if (!this.blockchain) {
      throw new Error('Blockchain integration not configured');
    }

    return await this.blockchain.getGovernanceProposals(dao);
  }

  async voteOnProposal(proposalId: string, support: boolean, reason?: string): Promise<any> {
    if (!this.blockchain) {
      throw new Error('Blockchain integration not configured');
    }

    return await this.blockchain.voteOnProposal(proposalId, support, reason);
  }

  // Original getters
  getAgents(): JuliaOSAgents {
    return this.agents;
  }

  getSwarms(): JuliaOSSwarms {
    return this.swarms;
  }

  getBridge(): JuliaOSBridge {
    return this.bridge;
  }

  getBlockchain(): BlockchainIntegration | undefined {
    return this.blockchain;
  }

  // Enhanced getters
  getLLMAgents(): Map<string, LLMAgent> {
    return this.llmAgents;
  }

  getSwarmCoordinators(): Map<string, SwarmCoordinator> {
    return this.swarmCoordinators;
  }

  getLLMAgent(agentId: string): LLMAgent | undefined {
    return this.llmAgents.get(agentId);
  }

  getSwarmCoordinator(swarmId: string): SwarmCoordinator | undefined {
    return this.swarmCoordinators.get(swarmId);
  }
}
