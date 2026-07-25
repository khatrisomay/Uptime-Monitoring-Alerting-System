pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production', 'dev'], description: 'Target Kubernetes namespace to rollback')
        string(name: 'DEPLOYMENT_NAME', defaultValue: 'uptime-monitor-backend', description: 'Deployment name to rollback')
    }

    stages {
        stage('Rollback Confirmation') {
            steps {
                echo "Initiating Kubernetes rollback for ${params.DEPLOYMENT_NAME} in ${params.ENVIRONMENT}..."
            }
        }

        stage('Execute Rollback') {
            steps {
                // withKubeConfig(credentialsId: 'kubeconfig-credentials') {
                //     sh "kubectl rollout undo deployment/${params.DEPLOYMENT_NAME} --namespace=${params.ENVIRONMENT}"
                //     sh "kubectl rollout status deployment/${params.DEPLOYMENT_NAME} --namespace=${params.ENVIRONMENT}"
                // }
                echo "Rollback command executed: kubectl rollout undo deployment/${params.DEPLOYMENT_NAME}"
            }
        }
    }

    post {
        always {
            echo "Rollback workflow completed."
        }
    }
}
