
// MITRE ATT&CK Framework utilities for threat intelligence

export interface MitreAttackTactic {
  id: string;
  name: string;
  description: string;
  techniques: MitreAttackTechnique[];
}

export interface MitreAttackTechnique {
  id: string;
  name: string;
  description: string;
  tactics: string[];
  platforms: string[];
  detectionMethods: string[];
  mitigations: string[];
  dataSourcesRequired: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ThreatHuntQuery {
  id: string;
  name: string;
  description: string;
  query: string;
  dataSource: string;
  mitreMapping: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastRun: Date;
  results: number;
}

export interface BehavioralAnomaly {
  id: string;
  userId: string;
  userName: string;
  anomalyType: 'login_pattern' | 'data_access' | 'network_behavior' | 'privilege_escalation';
  description: string;
  riskScore: number;
  timestamp: Date;
  mitreMapping: string[];
  evidence: string[];
  status: 'new' | 'investigating' | 'resolved' | 'false_positive';
}

// Sample MITRE ATT&CK tactics and techniques
export const mitreTactics: MitreAttackTactic[] = [
  {
    id: "TA0001",
    name: "Initial Access",
    description: "Techniques used to gain an initial foothold within a network",
    techniques: [
      {
        id: "T1566",
        name: "Phishing",
        description: "Adversaries may send phishing messages to gain access to victim systems",
        tactics: ["Initial Access"],
        platforms: ["Windows", "macOS", "Linux"],
        detectionMethods: ["Email analysis", "User behavior monitoring"],
        mitigations: ["User training", "Email filtering", "Network segmentation"],
        dataSourcesRequired: ["Email logs", "Web proxy logs", "DNS logs"],
        severity: "high"
      },
      {
        id: "T1190",
        name: "Exploit Public-Facing Application",
        description: "Adversaries may attempt to exploit a weakness in an Internet-facing application",
        tactics: ["Initial Access"],
        platforms: ["Windows", "Linux", "Network"],
        detectionMethods: ["Network monitoring", "Application logs"],
        mitigations: ["Regular patching", "Web application firewall"],
        dataSourcesRequired: ["Web server logs", "Network traffic", "Application logs"],
        severity: "critical"
      }
    ]
  },
  {
    id: "TA0002",
    name: "Execution",
    description: "Techniques that result in adversary-controlled code running on a local or remote system",
    techniques: [
      {
        id: "T1059",
        name: "Command and Scripting Interpreter",
        description: "Adversaries may abuse command and script interpreters to execute commands",
        tactics: ["Execution"],
        platforms: ["Windows", "macOS", "Linux"],
        detectionMethods: ["Process monitoring", "Command line analysis"],
        mitigations: ["Restrict script execution", "Privileged account management"],
        dataSourcesRequired: ["Process logs", "Command line logs"],
        severity: "high"
      }
    ]
  },
  {
    id: "TA0003",
    name: "Persistence",
    description: "Techniques that adversaries use to keep access to systems across restarts",
    techniques: [
      {
        id: "T1547",
        name: "Boot or Logon Autostart Execution",
        description: "Adversaries may configure system settings to automatically execute a program",
        tactics: ["Persistence", "Privilege Escalation"],
        platforms: ["Windows", "macOS", "Linux"],
        detectionMethods: ["Registry monitoring", "File monitoring"],
        mitigations: ["Audit autostart locations", "User account control"],
        dataSourcesRequired: ["Registry logs", "File system logs"],
        severity: "medium"
      }
    ]
  }
];

// Sample threat hunting queries
export const threatHuntQueries: ThreatHuntQuery[] = [
  {
    id: "hunt-001",
    name: "Suspicious PowerShell Activity",
    description: "Detect suspicious PowerShell commands that may indicate malicious activity",
    query: "SELECT * FROM process_logs WHERE command_line LIKE '%powershell%' AND (command_line LIKE '%Invoke-Expression%' OR command_line LIKE '%downloadstring%')",
    dataSource: "Process Logs",
    mitreMapping: ["T1059.001"],
    severity: "high",
    lastRun: new Date(),
    results: 23
  },
  {
    id: "hunt-002",
    name: "Unusual Network Connections",
    description: "Identify outbound connections to suspicious domains or IPs",
    query: "SELECT * FROM network_logs WHERE destination_ip NOT IN (trusted_ips) AND protocol = 'TCP' AND port IN (443, 80, 53)",
    dataSource: "Network Logs",
    mitreMapping: ["T1071"],
    severity: "medium",
    lastRun: new Date(Date.now() - 3600000),
    results: 156
  },
  {
    id: "hunt-003",
    name: "Privilege Escalation Attempts",
    description: "Detect attempts to escalate privileges using common techniques",
    query: "SELECT * FROM auth_logs WHERE event_type = 'privilege_change' OR command LIKE '%sudo%' OR command LIKE '%runas%'",
    dataSource: "Authentication Logs",
    mitreMapping: ["T1078", "T1548"],
    severity: "critical",
    lastRun: new Date(Date.now() - 1800000),
    results: 7
  }
];

// Sample behavioral anomalies
export const behavioralAnomalies: BehavioralAnomaly[] = [
  {
    id: "anomaly-001",
    userId: "user123",
    userName: "john.doe@company.com",
    anomalyType: "login_pattern",
    description: "User logged in from unusual geographic location (Russia) outside normal business hours",
    riskScore: 85,
    timestamp: new Date(Date.now() - 7200000),
    mitreMapping: ["T1078"],
    evidence: ["Login from IP 203.0.113.45", "Time: 2:30 AM local time", "Location: Moscow, Russia"],
    status: "investigating"
  },
  {
    id: "anomaly-002", 
    userId: "user456",
    userName: "sarah.smith@company.com",
    anomalyType: "data_access",
    description: "Unusual volume of file downloads from shared drives (500% above baseline)",
    riskScore: 72,
    timestamp: new Date(Date.now() - 3600000),
    mitreMapping: ["T1005", "T1039"],
    evidence: ["Downloaded 2.3GB in 1 hour", "Accessed 45 different directories", "Unusual file types accessed"],
    status: "new"
  },
  {
    id: "anomaly-003",
    userId: "user789",
    userName: "mike.wilson@company.com", 
    anomalyType: "privilege_escalation",
    description: "User attempted to access administrative functions not typical for their role",
    riskScore: 91,
    timestamp: new Date(Date.now() - 900000),
    mitreMapping: ["T1548", "T1078.004"],
    evidence: ["Attempted to access domain controller", "Used administrative tools", "Multiple failed privilege escalation attempts"],
    status: "new"
  }
];

// Utility functions
export const getTechniqueById = (id: string): MitreAttackTechnique | undefined => {
  for (const tactic of mitreTactics) {
    const technique = tactic.techniques.find(t => t.id === id);
    if (technique) return technique;
  }
  return undefined;
};

export const getTechniquesByTactic = (tacticId: string): MitreAttackTechnique[] => {
  const tactic = mitreTactics.find(t => t.id === tacticId);
  return tactic ? tactic.techniques : [];
};

export const calculateRiskScore = (anomaly: BehavioralAnomaly): string => {
  if (anomaly.riskScore >= 90) return "Critical";
  if (anomaly.riskScore >= 70) return "High";
  if (anomaly.riskScore >= 50) return "Medium";
  return "Low";
};

export const getAnomalyColor = (riskScore: number): string => {
  if (riskScore >= 90) return "text-red-500";
  if (riskScore >= 70) return "text-orange-500";
  if (riskScore >= 50) return "text-yellow-500";
  return "text-green-500";
};
