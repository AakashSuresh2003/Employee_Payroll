pipeline {
    agent any
    environment {
        PORT = '3000'  
    }
    tools {nodejs "node"}
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/AakashSuresh2003/Employee_Payroll.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Building Docker Image') {
            steps {
                script {
                    sh 'docker build -t node-app .'
                }
            }
        }
        stage('Deploying Docker Image') {
            steps {
                script {
                    sh 'docker run -d 3000:3000 node-app'
                }
            }
        }
    }
}
