pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '15', artifactNumToKeepStr: '5'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        ansiColor('xterm')
        timestamps()
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Target Git branch for deployment')
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production', 'dev'], description: 'Deployment target environment')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Skip unit test execution for emergency hotfix deployments')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                // git branch: "${params.BRANCH_NAME}", url: 'https://github.com/khatrisomay/Uptime-Monitoring-Alerting-System.git'
            }
        }
        
        stage('Test Backend') {
            steps {
                echo 'Running pytest...'
                dir('backend') {
                    // sh 'pip install -r requirements.txt'
                    // sh 'pytest'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                echo 'Running frontend tests...'
                dir('frontend') {
                    // sh 'npm install'
                    // sh 'npm run test'
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                echo 'Building backend image...'
                // sh 'docker build -t yourusername/uptime-backend ./backend'
                echo 'Building frontend image...'
                // sh 'docker build -t yourusername/uptime-frontend ./frontend'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Applying K8s manifests to ${params.ENVIRONMENT}..."
                // sh 'kubectl apply -f ./k8s/'
            }
        }
    }
}
