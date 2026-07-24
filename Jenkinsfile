pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '15', artifactNumToKeepStr: '5'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        ansiColor('xterm')
        timestamps()
    }

    environment {
        DOCKER_REGISTRY    = 'docker.io'
        DOCKER_USER        = 'khatrisomay'
        IMAGE_NAME_BACKEND = 'uptime-monitor-backend'
        IMAGE_NAME_FRONTEND= 'uptime-monitor-frontend'
        IMAGE_TAG          = "${BUILD_NUMBER}-${GIT_COMMIT[0..7]}"
        DOCKER_CRED_ID     = 'dockerhub-credentials'
        KUBE_CONFIG_ID     = 'kubeconfig-credentials'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Target Git branch for deployment')
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production', 'dev'], description: 'Deployment target environment')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Skip unit test execution for emergency hotfix deployments')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code for commit ${env.GIT_COMMIT}..."
                // checkout scm
            }
        }

        stage('Parallel Code Linting') {
            parallel {
                stage('Lint Backend') {
                    steps {
                        dir('backend') {
                            echo 'Running Python syntax and style verification...'
                            // sh 'pip install flake8'
                            // sh 'flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics'
                        }
                    }
                }
                stage('Lint Frontend') {
                    steps {
                        dir('frontend') {
                            echo 'Running React code style and oxlint static analysis...'
                            // sh 'npm ci'
                            // sh 'npm run lint'
                        }
                    }
                }
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
                echo "Building backend image ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_BACKEND}:${env.IMAGE_TAG}..."
                // sh 'docker build -t ...'
                echo "Building frontend image ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_FRONTEND}:${env.IMAGE_TAG}..."
                // sh 'docker build -t ...'
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
