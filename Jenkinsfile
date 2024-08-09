// pipeline {
//     agent any
//     environment {
//         PORT = '3000'  
//     }
//     tools {nodejs "node"}
//     stages {
//         stage('Checkout') {
//             steps {
//                 git url: 'https://github.com/AakashSuresh2003/Employee_Payroll.git', branch: 'main'
//             }
//         }
//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }
//         stage('Start Server') {
//             steps {
//                 script {
//                     sh 'nohup npm start &'
//                 }
//             }
//         }
//     }
// }


pipeline {
    agent any
    environment {
        PORT = '3000'
    }
    tools { nodejs "node" }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out repository...'
                git url: 'https://github.com/AakashSuresh2003/Employee_Payroll.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Start Server') {
            steps {
                echo 'Starting server...'
            script {
                sh 'nohup npm start'
                sleep 10 
                sh 'curl http://localhost:$PORT' 
                }
            }
        }
    }
}

