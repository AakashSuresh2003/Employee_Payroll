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
        stage('Start Server') {
            steps {
                script {
                    sh 'nohup npm start > server.log 2>&1 &'
                }
            }
        }
        stage('Verify Server') {
            steps {
                script {
                    sh 'sleep 5'
                    sh 'curl http://localhost:3000 || echo "Server is not reachable"'
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
