// Jenkins Job DSL Script: Automate Multibranch Pipeline creation
multibranchPipelineJob('Uptime-Monitor-CI-CD') {
    displayName('Uptime Monitoring & Alerting System')
    description('Automated Multibranch CI/CD Pipeline for Uptime Monitor project')
    
    branchSources {
        git {
            id('uptime-monitor-git-source')
            remote('https://github.com/khatrisomay/Uptime-Monitoring-Alerting-System.git')
            includes('main staging dev feature/*')
        }
    }

    factory {
        workflowBranchProjectFactory {
            scriptPath('Jenkinsfile')
        }
    }

    orphanedItemStrategy {
        discardOldItems {
            numToKeep(10)
        }
    }

    triggers {
        periodicFolderTrigger {
            interval('1d')
        }
    }
}
