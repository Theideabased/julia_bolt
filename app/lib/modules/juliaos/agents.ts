import { JuliaOSBridge, type AgentConfig, type AgentInfo } from './bridge';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('JuliaOSAgents');

export interface DevAgentConfig extends AgentConfig {
  type: 'dev';
  config: {
    languages: string[];
    frameworks: string[];
    specialties: string[];
    codeStyle: string;
    llmProvider?: string;
    llmModel?: string;
  };
}

export interface ResearchAgentConfig extends AgentConfig {
  type: 'research';
  config: {
    researchAreas: string[];
    dataSources: string[];
    analysisMethods: string[];
    outputFormats: string[];
  };
}

export interface TestingAgentConfig extends AgentConfig {
  type: 'testing';
  config: {
    testingTypes: string[];
    frameworks: string[];
    coverage: string;
    automation: boolean;
  };
}

export interface DeploymentAgentConfig extends AgentConfig {
  type: 'deployment';
  config: {
    platforms: string[];
    strategies: string[];
    monitoring: boolean;
    rollback: boolean;
  };
}

export interface MonitoringAgentConfig extends AgentConfig {
  type: 'monitoring';
  config: {
    metrics: string[];
    alerts: string[];
    thresholds: Record<string, number>;
    integrations: string[];
  };
}

/**
 * JuliaOS Agents Manager
 * Provides specialized agent creation and management
 */
export class JuliaOSAgents {
  private bridge: JuliaOSBridge;

  constructor(bridge: JuliaOSBridge) {
    this.bridge = bridge;
  }

  async createAgent(config: AgentConfig): Promise<AgentInfo> {
    if (!this.bridge.isConnected()) {
      throw new Error('JuliaOS Bridge is not connected');
    }

    logger.info(`Creating agent: ${config.name} (${config.type})`);
    return await this.bridge.runJuliaCommand('agents.create_agent', config);
  }

  async listAgents(filter?: { type?: string; status?: string }): Promise<AgentInfo[]> {
    const agents = await this.bridge.runJuliaCommand('agents.list_agents', {});
    
    if (!filter) {
      return agents;
    }

    return agents.filter((agent: AgentInfo) => {
      if (filter.type && agent.type !== filter.type) {
        return false;
      }
      if (filter.status && agent.status !== filter.status) {
        return false;
      }
      return true;
    });
  }

  async startAgent(agentId: string): Promise<void> {
    logger.info(`Starting agent: ${agentId}`);
    return await this.bridge.runJuliaCommand('agents.start_agent', { agentId });
  }

  async stopAgent(agentId: string): Promise<void> {
    logger.info(`Stopping agent: ${agentId}`);
    return await this.bridge.runJuliaCommand('agents.stop_agent', { agentId });
  }

  async executeTask(agentId: string, task: Record<string, any>): Promise<any> {
    logger.info(`Executing task on agent ${agentId}:`, task);
    return await this.bridge.runJuliaCommand('agents.execute_task', { agentId, task });
  }

  async getAgentStatus(agentId: string): Promise<AgentInfo> {
    return await this.bridge.runJuliaCommand('agents.get_status', { agentId });
  }

  async deleteAgent(agentId: string): Promise<void> {
    logger.info(`Deleting agent: ${agentId}`);
    return await this.bridge.runJuliaCommand('agents.delete_agent', { agentId });
  }

  // Specialized agent creators
  async createDevAgent(config: Omit<DevAgentConfig, 'type'>): Promise<AgentInfo> {
    return this.createAgent({
      ...config,
      type: 'dev',
    });
  }

  async createResearchAgent(config: Omit<ResearchAgentConfig, 'type'>): Promise<AgentInfo> {
    return this.createAgent({
      ...config,
      type: 'research',
    });
  }

  async createTestingAgent(config: Omit<TestingAgentConfig, 'type'>): Promise<AgentInfo> {
    return this.createAgent({
      ...config,
      type: 'testing',
    });
  }

  async createDeploymentAgent(config: Omit<DeploymentAgentConfig, 'type'>): Promise<AgentInfo> {
    return this.createAgent({
      ...config,
      type: 'deployment',
    });
  }

  async createMonitoringAgent(config: Omit<MonitoringAgentConfig, 'type'>): Promise<AgentInfo> {
    return this.createAgent({
      ...config,
      type: 'monitoring',
    });
  }

  // Agent memory management
  async setAgentMemory(agentId: string, key: string, value: any): Promise<void> {
    return await this.bridge.runJuliaCommand('agents.set_memory', { agentId, key, value });
  }

  async getAgentMemory(agentId: string, key: string): Promise<any> {
    return await this.bridge.runJuliaCommand('agents.get_memory', { agentId, key });
  }

  async deleteAgentMemory(agentId: string, key: string): Promise<void> {
    return await this.bridge.runJuliaCommand('agents.delete_memory', { agentId, key });
  }
}
