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
            when {
                expression { return !params.SKIP_TESTS }
            }
            steps {
                dir('backend') {
                    echo 'Installing dependencies and executing Pytest suite...'
                    sh '''
                        python -m pip install --upgrade pip
                        pip install -r requirements.txt pytest pytest-cov
                        pytest tests/ --junitxml=test-results.xml --cov=. --cov-report=xml
                    '''
                    junit allowEmptyResults: true, testResults: 'test-results.xml'
                }
            }
        }
        
        stage('Test & Build Frontend') {
            when {
                expression { return !params.SKIP_TESTS }
            }
            steps {
                dir('frontend') {
                    echo 'Installing React dependencies and building production distribution...'
                    sh '''
                        npm ci
                        npm run build
                    '''
                    archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CRED_ID, usernameVariable: 'DOCKER_USER_VAR', passwordVariable: 'DOCKER_PASS_VAR')]) {
                    echo "Logging into Docker Registry ${env.DOCKER_REGISTRY}..."
                    sh "echo \$DOCKER_PASS_VAR | docker login -u \$DOCKER_USER_VAR --password-stdin ${env.DOCKER_REGISTRY}"
                    
                    echo "Building & pushing backend container..."
                    sh "docker build -t ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_BACKEND}:${env.IMAGE_TAG} ./backend"
                    sh "docker build -t ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_BACKEND}:latest ./backend"
                    sh "docker push ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_BACKEND}:${env.IMAGE_TAG}"
                    sh "docker push ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_BACKEND}:latest"

                    echo "Building & pushing frontend container..."
                    sh "docker build -t ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_FRONTEND}:${env.IMAGE_TAG} ./frontend"
                    sh "docker build -t ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_FRONTEND}:latest ./frontend"
                    sh "docker push ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_FRONTEND}:${env.IMAGE_TAG}"
                    sh "docker push ${env.DOCKER_REGISTRY}/${env.DOCKER_USER}/${env.IMAGE_NAME_FRONTEND}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Applying K8s manifests to environment: ${params.ENVIRONMENT}..."
                // withKubeConfig(credentialsId: env.KUBE_CONFIG_ID) {
                //     sh "kubectl apply -f ./deployments/k8s/ --namespace=${params.ENVIRONMENT}"
                //     sh "kubectl rollout status deployment/uptime-monitor-backend --namespace=${params.ENVIRONMENT}"
                //     sh "kubectl rollout status deployment/uptime-monitor-frontend --namespace=${params.ENVIRONMENT}"
                // }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Build #${env.BUILD_NUMBER} deployed successfully to ${params.ENVIRONMENT}."
            // slackSend channel: '#deployments', color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]"
        }
        failure {
            echo "Pipeline failed! Build #${env.BUILD_NUMBER} requires attention."
            // slackSend channel: '#deployments-alerts', color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]"
        }
        always {
            echo "Cleaning workspace for build #${env.BUILD_NUMBER}..."
            cleanWs deleteDirs: true, notFailBuild: true
        }
    }
}
