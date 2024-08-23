pipeline {
    agent any
    environment {
        PORT = '3000'
        SONAR_SCANNER_HOME = '/var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/poc'
        PATH = "${env.SONAR_SCANNER_HOME}/bin:${env.PATH}"
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
        stage('SonarQube Analysis') {
            steps {
                script {
                    sh 'sonar-scanner -Dsonar.projectKey=roll -Dsonar.sources=. -Dsonar.host.url=http://13.60.5.108:9000 -Dsonar.login=sqp_9fb69b22abd453165ca3d6a0f52d74d2c6fe731d'
                }
            }
        }
        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t new-node-app:latest .'
                }
            }
        }
        stage('Deploy Container') {
            steps {
                script {
                    sh 'docker stop node-app-container || true'
                    sh 'docker rm node-app-container || true'
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
}
