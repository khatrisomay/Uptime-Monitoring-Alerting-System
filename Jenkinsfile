pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                // git 'https://github.com/yourusername/uptime-monitor.git'
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
                echo 'Applying K8s manifests...'
                // sh 'kubectl apply -f ./k8s/'
            }
        }
    }
}
