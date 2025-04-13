
import { useTheme } from "@/providers/ThemeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export function AgentCodePreview() {
  const { isDarkMode } = useTheme();
  
  // Sample code snippets for agent in different languages
  const rustCode = `
// Core agent functionality in Rust
use std::time::Duration;
use tokio::time;

#[derive(Debug, Serialize, Deserialize)]
struct SecurityEvent {
    event_type: String,
    severity: String,
    details: String,
    timestamp: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct SystemMetrics {
    cpu_usage: f64,
    memory_usage: f64,
    disk_usage: f64,
    network_connections: u32,
}

async fn collect_system_metrics() -> SystemMetrics {
    // Platform-specific code to collect metrics
    SystemMetrics {
        cpu_usage: cpu_collector::get_usage(),
        memory_usage: memory_collector::get_usage(),
        disk_usage: disk_collector::get_usage(),
        network_connections: network_collector::get_connection_count(),
    }
}

async fn detect_security_threats() -> Vec<SecurityEvent> {
    // Analyze system for security threats
    let mut events = Vec::new();
    
    // Check for suspicious processes
    for process in process_monitor::get_suspicious() {
        events.push(SecurityEvent {
            event_type: "suspicious_process".to_string(),
            severity: "high".to_string(),
            details: format!("Suspicious process detected: {}", process.name),
            timestamp: unix_timestamp(),
        });
    }
    
    // More threat detection logic...
    
    events
}

async fn send_data_to_server(metrics: &SystemMetrics, events: &[SecurityEvent]) -> Result<(), Error> {
    let client = ApiClient::new(
        config::get_server_address(),
        config::get_api_key(),
    );
    
    if !events.is_empty() {
        client.send_events(events).await?;
    }
    
    client.send_metrics(metrics).await?;
    
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("Starting AttackVista Security Agent...");
    
    // Register with server
    let agent_id = register_with_server().await?;
    println!("Agent registered with ID: {}", agent_id);
    
    // Main monitoring loop
    let mut interval = time::interval(Duration::from_secs(60));
    loop {
        interval.tick().await;
        
        // Collect system metrics
        let metrics = collect_system_metrics().await;
        
        // Check for security threats
        let events = detect_security_threats().await;
        
        // Send data to server
        if let Err(e) = send_data_to_server(&metrics, &events).await {
            eprintln!("Error sending data to server: {}", e);
        }
    }
}`;

  const windowsCode = `
// Windows-specific monitoring code in C++
#include <windows.h>
#include <psapi.h>
#include <tlhelp32.h>
#include <winsock2.h>
#include <vector>
#include <string>

struct ProcessInfo {
    DWORD pid;
    std::string name;
    double cpu_usage;
    SIZE_T memory_usage;
};

class WindowsMonitor {
public:
    // Get list of running processes with resource usage
    std::vector<ProcessInfo> GetProcessList() {
        std::vector<ProcessInfo> processes;
        HANDLE hProcessSnap;
        PROCESSENTRY32 pe32;
        
        // Take a snapshot of all processes
        hProcessSnap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (hProcessSnap == INVALID_HANDLE_VALUE) {
            return processes;
        }
        
        pe32.dwSize = sizeof(PROCESSENTRY32);
        
        // Get first process
        if (!Process32First(hProcessSnap, &pe32)) {
            CloseHandle(hProcessSnap);
            return processes;
        }
        
        // Iterate through processes
        do {
            ProcessInfo info;
            info.pid = pe32.th32ProcessID;
            info.name = pe32.szExeFile;
            
            // Get process handle for memory info
            HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, pe32.th32ProcessID);
            if (hProcess) {
                PROCESS_MEMORY_COUNTERS pmc;
                if (GetProcessMemoryInfo(hProcess, &pmc, sizeof(pmc))) {
                    info.memory_usage = pmc.WorkingSetSize;
                }
                CloseHandle(hProcess);
            }
            
            // CPU usage calculation would go here (more complex)
            info.cpu_usage = CalculateCpuUsage(pe32.th32ProcessID);
            
            processes.push_back(info);
        } while (Process32Next(hProcessSnap, &pe32));
        
        CloseHandle(hProcessSnap);
        return processes;
    }
    
    // Get network connections
    std::vector<NetworkConnection> GetNetworkConnections() {
        std::vector<NetworkConnection> connections;
        
        // Use Windows API to get TCP/IP connections
        MIB_TCPTABLE_OWNER_PID* pTcpTable = NULL;
        DWORD dwSize = 0;
        DWORD dwRetVal = 0;
        
        // First call to get required size
        dwRetVal = GetExtendedTcpTable(NULL, &dwSize, TRUE, AF_INET, TCP_TABLE_OWNER_PID_ALL, 0);
        
        // Allocate memory
        pTcpTable = (MIB_TCPTABLE_OWNER_PID*)malloc(dwSize);
        
        // Get actual data
        dwRetVal = GetExtendedTcpTable(pTcpTable, &dwSize, TRUE, AF_INET, TCP_TABLE_OWNER_PID_ALL, 0);
        
        if (dwRetVal == NO_ERROR) {
            for (DWORD i = 0; i < pTcpTable->dwNumEntries; i++) {
                NetworkConnection conn;
                conn.protocol = "TCP";
                conn.local_ip = ConvertIpToString(pTcpTable->table[i].dwLocalAddr);
                conn.local_port = ntohs((u_short)pTcpTable->table[i].dwLocalPort);
                conn.remote_ip = ConvertIpToString(pTcpTable->table[i].dwRemoteAddr);
                conn.remote_port = ntohs((u_short)pTcpTable->table[i].dwRemotePort);
                conn.pid = pTcpTable->table[i].dwOwningPid;
                conn.state = GetTcpStateName(pTcpTable->table[i].dwState);
                
                connections.push_back(conn);
            }
        }
        
        free(pTcpTable);
        
        // Similar code for UDP connections would go here
        
        return connections;
    }
    
    // More monitoring functions...
};`;

  const linuxCode = `
// Linux-specific monitoring code
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <dirent.h>
#include <vector>
#include <string>
#include <fstream>

class LinuxMonitor {
public:
    // Get CPU usage
    double GetCpuUsage() {
        std::ifstream statFile("/proc/stat");
        std::string line;
        getline(statFile, line);
        
        unsigned long user, nice, system, idle, iowait, irq, softirq, steal;
        sscanf(line.c_str(), "cpu %lu %lu %lu %lu %lu %lu %lu %lu",
               &user, &nice, &system, &idle, &iowait, &irq, &softirq, &steal);
        
        // Calculate CPU usage based on deltas between readings
        unsigned long total = user + nice + system + idle + iowait + irq + softirq + steal;
        unsigned long active = user + nice + system + irq + softirq + steal;
        
        // This is simplified - real implementation would compare with previous reading
        return (double)active / total * 100.0;
    }
    
    // Get memory usage
    MemoryInfo GetMemoryInfo() {
        MemoryInfo info = {};
        
        std::ifstream memFile("/proc/meminfo");
        std::string line;
        
        while (getline(memFile, line)) {
            if (line.find("MemTotal:") == 0) {
                sscanf(line.c_str(), "MemTotal: %lu kB", &info.total);
            } else if (line.find("MemFree:") == 0) {
                sscanf(line.c_str(), "MemFree: %lu kB", &info.free);
            } else if (line.find("MemAvailable:") == 0) {
                sscanf(line.c_str(), "MemAvailable: %lu kB", &info.available);
            }
        }
        
        info.used = info.total - info.available;
        return info;
    }
    
    // Get running processes
    std::vector<ProcessInfo> GetProcessList() {
        std::vector<ProcessInfo> processes;
        DIR* dir = opendir("/proc");
        if (!dir) {
            return processes;
        }
        
        struct dirent* entry;
        while ((entry = readdir(dir)) != NULL) {
            // Check if this is a process (directory with numeric name)
            if (entry->d_type == DT_DIR) {
                char* endptr;
                long pid = strtol(entry->d_name, &endptr, 10);
                if (*endptr == '\\0') {  // Valid number
                    ProcessInfo info;
                    info.pid = pid;
                    
                    // Read process name
                    char path[100];
                    snprintf(path, sizeof(path), "/proc/%ld/comm", pid);
                    std::ifstream commFile(path);
                    if (commFile.is_open()) {
                        getline(commFile, info.name);
                    }
                    
                    // Read memory usage
                    snprintf(path, sizeof(path), "/proc/%ld/status", pid);
                    std::ifstream statusFile(path);
                    std::string line;
                    while (getline(statusFile, line)) {
                        if (line.find("VmRSS:") == 0) {
                            sscanf(line.c_str(), "VmRSS: %lu", &info.memory_usage);
                            break;
                        }
                    }
                    
                    processes.push_back(info);
                }
            }
        }
        
        closedir(dir);
        return processes;
    }
    
    // More monitoring functions...
};`;

  const macCode = `
// macOS-specific monitoring code
#import <Foundation/Foundation.h>
#import <IOKit/IOKitLib.h>
#import <sys/sysctl.h>
#import <mach/mach.h>
#import <mach/mach_host.h>

@interface MacOSMonitor : NSObject

// Get CPU usage
- (double)getCpuUsage {
    processor_cpu_load_info_t cpuLoad;
    mach_msg_type_number_t processorMsgCount;
    natural_t processorCount;
    
    kern_return_t err = host_processor_info(
        mach_host_self(),
        PROCESSOR_CPU_LOAD_INFO,
        &processorCount,
        (processor_info_array_t *)&cpuLoad,
        &processorMsgCount
    );
    
    if (err != KERN_SUCCESS) {
        return -1.0;
    }
    
    double totalCpu = 0.0;
    for (natural_t i = 0; i < processorCount; i++) {
        // Calculate CPU usage for each core
        unsigned long total = cpuLoad[i].cpu_ticks[CPU_STATE_USER] +
                             cpuLoad[i].cpu_ticks[CPU_STATE_SYSTEM] +
                             cpuLoad[i].cpu_ticks[CPU_STATE_IDLE] +
                             cpuLoad[i].cpu_ticks[CPU_STATE_NICE];
        
        unsigned long active = cpuLoad[i].cpu_ticks[CPU_STATE_USER] +
                              cpuLoad[i].cpu_ticks[CPU_STATE_SYSTEM] +
                              cpuLoad[i].cpu_ticks[CPU_STATE_NICE];
        
        double usage = (double)active / (double)total * 100.0;
        totalCpu += usage;
    }
    
    // Average across all cores
    double avgCpu = totalCpu / (double)processorCount;
    
    // Free allocated memory
    vm_deallocate(mach_task_self(), (vm_address_t)cpuLoad, processorMsgCount * sizeof(processor_cpu_load_info_data_t));
    
    return avgCpu;
}

// Get memory usage
- (NSDictionary *)getMemoryInfo {
    mach_msg_type_number_t count = HOST_VM_INFO_COUNT;
    vm_statistics_data_t vmStats;
    
    if (host_statistics(mach_host_self(), HOST_VM_INFO, (host_info_t)&vmStats, &count) != KERN_SUCCESS) {
        return nil;
    }
    
    // Get page size
    vm_size_t pageSize = vm_kernel_page_size;
    
    // Calculate memory usage
    uint64_t used = (vmStats.active_count + vmStats.wire_count) * pageSize;
    uint64_t free = vmStats.free_count * pageSize;
    
    // Get total physical memory
    int mib[2] = {CTL_HW, HW_MEMSIZE};
    uint64_t total = 0;
    size_t length = sizeof(total);
    
    if (sysctl(mib, 2, &total, &length, NULL, 0) == -1) {
        return nil;
    }
    
    return @{
        @"total": @(total),
        @"used": @(used),
        @"free": @(free)
    };
}

// Get process list
- (NSArray *)getProcessList {
    NSMutableArray *processes = [NSMutableArray array];
    
    // Get all processes
    int mib[4] = {CTL_KERN, KERN_PROC, KERN_PROC_ALL, 0};
    size_t length = 0;
    
    if (sysctl(mib, 4, NULL, &length, NULL, 0) < 0) {
        return processes;
    }
    
    struct kinfo_proc *procList = (struct kinfo_proc *)malloc(length);
    if (sysctl(mib, 4, procList, &length, NULL, 0) < 0) {
        free(procList);
        return processes;
    }
    
    // Calculate number of processes
    size_t procCount = length / sizeof(struct kinfo_proc);
    
    // Collect process information
    for (size_t i = 0; i < procCount; i++) {
        pid_t pid = procList[i].kp_proc.p_pid;
        if (pid == 0) continue;  // Skip kernel process
        
        NSString *name = [NSString stringWithUTF8String:procList[i].kp_proc.p_comm];
        
        // Get task information for memory usage
        task_t task;
        if (task_for_pid(mach_task_self(), pid, &task) == KERN_SUCCESS) {
            task_basic_info_data_t taskInfo;
            mach_msg_type_number_t count = TASK_BASIC_INFO_COUNT;
            
            if (task_info(task, TASK_BASIC_INFO, (task_info_t)&taskInfo, &count) == KERN_SUCCESS) {
                [processes addObject:@{
                    @"pid": @(pid),
                    @"name": name,
                    @"memory": @(taskInfo.resident_size)
                }];
            }
            
            mach_port_deallocate(mach_task_self(), task);
        } else {
            // If we can't get task info, just add basic info
            [processes addObject:@{
                @"pid": @(pid),
                @"name": name
            }];
        }
    }
    
    free(procList);
    return processes;
}

// More monitoring methods...

@end`;

  return (
    <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
      <h3 className="text-lg font-semibold mb-4">Agent Code Samples</h3>
      
      <Tabs defaultValue="rust">
        <TabsList className="mb-4">
          <TabsTrigger value="rust">Core (Rust)</TabsTrigger>
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="linux">Linux</TabsTrigger>
          <TabsTrigger value="mac">macOS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rust">
          <div className={`p-4 rounded-lg overflow-x-auto font-mono text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <pre className="whitespace-pre">{rustCode}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="windows">
          <div className={`p-4 rounded-lg overflow-x-auto font-mono text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <pre className="whitespace-pre">{windowsCode}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="linux">
          <div className={`p-4 rounded-lg overflow-x-auto font-mono text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <pre className="whitespace-pre">{linuxCode}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="mac">
          <div className={`p-4 rounded-lg overflow-x-auto font-mono text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <pre className="whitespace-pre">{macCode}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
