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
        stage('starting server') {
            steps {
                script {
                    sh 'npm start'
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
