pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/AakashSuresh2003/Employee_Payroll.git', branch: 'main'
            }
        }

    //     stage('Install Dependencies') {
    //         steps {
    //             script {
    //                 sh 'npm install'
    //             }
    //         }
    //     }

    //     stage('Build') {
    //         steps {
    //             script {
    //                 sh 'npm start'
    //             }
    //         }
    //     }

    //     stage('Deploy') {
    //         steps {
    //             script {
    //                 // Create deployment directory if it doesn't exist
    //                 sh "sudo mkdir -p ${env.APP_DIR}"
                    
    //                 // Clean previous deployment
    //                 sh "sudo rm -rf ${env.APP_DIR}/*"
                    
    //                 // Copy the built project to the deployment directory
    //                 sh "sudo cp -R ./* ${env.APP_DIR}/"
                    
    //                 // Ensure the correct permissions (optional, depending on your setup)
    //                 sh "sudo chown -R www-data:www-data ${env.APP_DIR}"
    //             }
    //         }
    //     }

    //     stage('Restart Apache') {
    //         steps {
    //             script {
    //                 // Restart Apache to pick up the changes
    //                 sh 'sudo systemctl restart apache2'
    //             }
    //         }
    //     }
    // }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}