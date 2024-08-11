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
        stage('Install Dependencies') {
            steps {
                // sh 'npm install'
                echo 'checking version'
                sh 'docker --version'
                // sh 'rm -rf node_modules/'
                // echo 'updating node'
                // sh 'npm update'
            }
        }
        stage('Building Docker Image') {
            steps {
                script {
                    sh 'docker build -t new-node-app .'
                }
            }
        }
        stage('Deploying Docker Image') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 new-node-app'
                }
            }
        }
    }
}
