pipeline {
    agent any
    environment {
        PORT = '3000'
        PATH = "/usr/local/bin:$PATH"
    }
    tools {
        nodejs 'node'
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
                    sh 'docker build -t new-node-app:latest .'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        
        stage('Deploy Container') {
            steps {
                script {
                    sh 'docker stop node-app-container || true'
                    sh 'docker rm node-app-container || true'
                    sh 'docker compose up -d --build'
                }
            }
        }
    }
}
