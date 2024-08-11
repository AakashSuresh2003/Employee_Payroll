pipeline {
    agent any
    environment {
        PORT = '3000'
        PATH = "/usr/local/bin:$PATH"
    }
    tools {
        nodejs "node"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/AakashSuresh2003/Employee_Payroll.git', branch: 'main'
            }
        }
        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }
        stage('Building Docker Image') {
            steps {
                script {
                    sh 'docker build -t new-node-app .'
                }
            }
        }
        stage('Deploy Container 1') {
            steps {
                script {
                    // Remove existing container if it exists
                    sh "docker stop node-app-container-1 || true"
                    sh "docker rm node-app-container-1 || true"
                    
                    // Run the first container
                    sh 'docker run -d -p 3001:3000 --name node-app-container-1 new-node-app'
                }
            }
        }
    }
}
