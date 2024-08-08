pipeline {
    agent any
    environment {
        PORT = '3000'  // Set your PORT environment variable here if needed
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
                    sh 'nohup npm start &'
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
